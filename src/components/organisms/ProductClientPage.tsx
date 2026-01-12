"use client"
import styled from "styled-components";
import Image from "next/image";
import { Product } from "@/lib/types/types";
type Props = {
    product: Product
}
function ProductClientPage({ product }: Props) {
    const Panel = styled.section`
        background-color: #fff;
        border: 1px solid #e4e4e7;
        border-radius: 10px;
        margin: 50px 0;
        height: 100%;
    `;

    const PanelHeader = styled.div`
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 1.25rem;
        background-color:#ccfbf1;
        border-radius:10px 10px 0 0;
        @media(max-width:767.98px) {
            padding: 1rem;
        }
    `;

    const ProductTitle = styled.h1`
        color: #0c5d56;
    `;

    const PanelBody = styled.div`
        padding: 1.25rem;
        @media(max-width:767.98px) {
            padding: 1rem;
        }
    `;

    const Price = styled.p`
        font-size:1.20rem;
        font-weight:600;
        color: #641ba3;
    `;

    return (
        <section className="container">
            <Panel>
                <PanelHeader>
                    <ProductTitle>{product.title}</ProductTitle>
                </PanelHeader>
                <PanelBody>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={300}
                    />

                    <p>{product.description}</p>
                    <Price>${product.price}</Price>
                </PanelBody>
            </Panel>
        </section>
    )
}

export default ProductClientPage