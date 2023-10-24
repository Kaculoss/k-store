import { getBillboard, getProducts } from "@/lib/get-functions"
import Container from "@/components/ui/container"
import Billboard from "@/components/billboard"
import ProductList from "@/components/product-list"

export const revalidate = 0

const HomePage = async () => {
  const [products, billboard] = await Promise.all([
    getProducts({ isFeatured: true }),
    getBillboard("d0b5b47f-a521-4662-862e-cacdddd07069"),
  ])

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8 px-4">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage
