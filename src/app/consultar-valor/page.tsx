import { Section } from '@/components/core/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SearchFipeForm } from './_components/search-fipe-form'

export default function ConsultarValor() {
  return (
    <Section title="Consultar valor">
      <Card>
        <CardHeader>
          <CardTitle>Consultar tabela Fipe</CardTitle>
          <CardDescription>
            Consule o valor de um veículo de forma gratuita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFipeForm />
        </CardContent>
      </Card>
    </Section>
  )
}
