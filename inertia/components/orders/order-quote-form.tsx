import { useForm } from "@tanstack/react-form";
import { css } from "~/styled-system/css";
import { center, hstack, vstack } from "~/styled-system/patterns";
import Card from "~/components/ui/card";
import { Button } from "../ui/button";
import Input from "../ui/input";
import { NumberInput } from "../ui/input-number";
import { TextArea } from "../ui/textarea";
import { router } from "@inertiajs/react";
import { Order } from "~/types/order";
import { useConfirm } from "../layout/confirm-context";
import BinIcon from "~/assets/icons/bin.svg?react"


type OrderProduct = {
  id?: string;
  name: string;
  duration: number;
  quantity: number;
  price: any;
  details?: string
}

// interface FormProps {
//   product: OrderProduct[]
// }

interface Props {
  order: Order
}

const confirmValues = {
  title: 'Confirmation de la création du devis',
  description: 'Êtes-vous sûr de vouloir soumettre le devis actuel au client ?'
}

export function OrderQuoteForm(props: Props) {
  const { order } = props

  const { confirm } = useConfirm()

  const form = useForm({
    defaultValues: {
      products: [{
        name: '',
        duration: 0,
        price: 0,
        quantity: 0,
        details: ''
      }]
    },
    onSubmit: async ({ value }) => {
      console.log({value})
      await createQuote(value) 
    }
  }) 

  async function createQuote(value: any) {
    if (!await confirm(confirmValues)) return
    await router.post(`/orders/${order.id}/products`, value, {
      onSuccess: async () => {
        console.log('quote created.')
      }
    })
  } 

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={vstack({ w: "100%", alignItems: "start" })}
    >
      <form.Field 
        name="products" 
        mode="array"
        children={(field) => (
          <>
            <ul className={vstack({ alignItems: "start", w: "100%" })}>
              {field.state.value.map((_, i) => (
                <li
                  id={`product-${i}`}
                  className={vstack({ alignItems: "start", w: "100%" })} 
                  key={i}
                >
                  <div className={hstack({ justifyContent: "space-between", w: "100%" })}>
                    <h3 className={css({ textStyle: "h3" })}>Produit n°{i + 1}</h3>
                    <Button variant="danger" onClick={() => field.removeValue(i)}><BinIcon /> Supprimer</Button>
                  </div>
                  <Card css={{ w: "100%", p: "1rem" }} withShadow>
                    <form.Field 
                      name={`products[${i}].name`}
                      children={(subfield) => (
                        <Input 
                          label="Intitulé du produit"
                          name={subfield.name}
                          value={subfield.state.value}
                          onChange={(e) => subfield.handleChange(e.target.value)}
                        />
                      )}
                    />
                    <form.Field 
                      name={`products[${i}].quantity`}
                      children={(subfield) => (
                        <NumberInput 
                          label="Quantité"
                          name={subfield.name}
                          value={subfield.state.value}
                          onChange={(details) => subfield.handleChange(details.valueAsNumber)}
                        />
                      )}
                    />
                    <form.Field 
                      name={`products[${i}].price`}
                      children={(subfield) => (
                        <NumberInput 
                          label="Prix unité (en €)"
                          formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 3 }}
                          name={subfield.name}
                          value={subfield.state.value}
                          onChange={(details) => {
                            subfield.handleChange(details.valueAsNumber)
                          }}
                        />
                      )}
                    />
                    <form.Field 
                      name={`products[${i}].duration`}
                      children={(subfield) => (
                        <NumberInput 
                          label="Durée (en jours)"
                          name={subfield.name}
                          value={subfield.state.value}
                          onChange={(details) => subfield.handleChange(details.valueAsNumber)}
                        />
                      )}
                    />
                    <form.Field 
                      name={`products[${i}].details`}
                      children={(subfield) => (
                        <TextArea 
                          label="Détails sur le produit"
                          name={subfield.name}
                          value={subfield.state.value}
                          onChange={e => subfield.handleChange(e.target.value)}
                          errorMessage={subfield.state.meta.errors.join(', ')} 
                          placeholder="10 mots minimum..."
                        />
                      )}
                    />
                  </Card>
                </li>
              ))}
            </ul>
            <span 
              className={center({ w: "100%", mt: "1rem", cursor: "pointer", backgroundColor: "white", textStyle: "body", border: "dashed 2px black", borderRadius: "10px", h: "5rem", transition: "ease-in-out", _hover: { backgroundColor: "gray"}})}
              onClick={() => {
                const element = document.getElementById(`product-${form.state.values.products.length - 1}`);
                field.pushValue({
                  name: '',
                  duration: 0,
                  price: 0,
                  quantity: 0,
                  details: ''
                })
                element?.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                }); 
              }}
            >
              + Ajouter un produit
            </span>
          </>
        )}
      />
      <form.Subscribe 
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button size="large" type="submit" disabled={!canSubmit}>+ Créer</Button>
        )}
      />    
    </form>
  )
}
            