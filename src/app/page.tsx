import ProductsContainer from "@/components/organisms/products/ProductContainer";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <section className="container">
        <ProductsContainer/>
      </section>
    </main>
  );
}
