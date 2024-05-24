import { Section } from '@/components/core/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SavedInformationList } from './_components/saved-information-list'
import { SearchFipeForm } from './_components/search-fipe-form'

export default function ConsultarValor() {
  return (
    <Section
      title="Consultar valor"
      className="flex flex-col gap-4 xl:flex-row"
    >
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Consultar tabela Fipe</CardTitle>
          <CardDescription>
            Consulte o valor de um veículo de forma gratuita.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFipeForm />
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Itens salvos</CardTitle>
          <CardDescription>
            Visualize as informações do Fipe salvas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SavedInformationList />
        </CardContent>
      </Card>
    </Section>
  )
}
