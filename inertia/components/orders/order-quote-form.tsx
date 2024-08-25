import { useForm } from "@tanstack/react-form";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import Card from "~/components/ui/card";
import { Button } from "../ui/button";
import Input from "../ui/input";
import { NumberInput } from "../ui/input-number";
import { TextArea } from "../ui/textarea";
import { router } from "@inertiajs/react";
import { Order } from "~/types/order";
import { useConfirm } from "../layout/confirm-context";

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
  title: 'title',
  description: 'desc'
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
                  className={css({ w: "100%" })} 
                  key={i}
                >
                  <Card css={{ w: "100%", p: "1rem" }} withShadow>
                    <h3 className={css({ textStyle: "h3" })}>Produit n°{i + 1}</h3>
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
                          label="Prix unité"
                          // formatOptions={{
                          //   style: "currency",
                          //   currency: "EUR"
                          // }}
                          name={subfield.name}
                          value={subfield.state.value}
                          onChange={(details) => {
                            console.log('details.valueAsNumber', details.valueAsNumber)
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
                    <Button variant="danger" onClick={() => field.removeValue(i)}>Supprimer</Button>
                  </Card>
                </li>
              ))}
            </ul>
            <Button 
              variant="success" 
              type="button" 
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
            </Button>
          </>
        )}
      />
      <form.Subscribe 
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button type="submit" disabled={!canSubmit}>Créer</Button>
        )}
      />    
    </form>
  )
}
            