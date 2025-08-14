"use client"
import React, { useState, useEffect } from 'react'
import { Product } from '@/utils/types'
import { Card, List, Typography, Tag, Rate } from 'antd';
interface OverViewProps {
    product_detail: Product | null
}

const tabListNoTitle = [
    {
        key: 'description',
        label: 'Description',
    },
    {
        key: 'properties',
        label: 'Properties',
    },
    {
        key: 'reviews',
        label: 'Reviews',
    },
];

const ProductDetailOverview: React.FC<OverViewProps> = ({ product_detail }) => {
    const [activeTabKey, setActiveTabKey] = useState<string>('description');
    const listItem = [
        {
            title: "SKU",
            label: product_detail?.sku
        },
        {
            title: "Title",
            label: product_detail?.title,
        },
        {
            title: "Brand",
            label: product_detail?.brand,
        },
        {
            title: "Tags",
            label: product_detail?.tags?.map((tag, key) => <Tag key={key} color='magenta'>{tag.toUpperCase()}</Tag>),
        },
        {
            title: "Dimensions",
            label: product_detail?.dimensions.width + "x" + product_detail?.dimensions.height + "x" + product_detail?.dimensions.depth
        },
        {
            title: "Return Policy",
            label: product_detail?.returnPolicy
        },
        {
            title: "Warranty Information",
            label: product_detail?.warrantyInformation
        },
        {
            title: "Shipping Information",
            label: product_detail?.shippingInformation
        },
        {
            title: "Availability Status",
            label: product_detail?.availabilityStatus
        },
        {
            title: "Minimum Order Quantity",
            label: product_detail?.minimumOrderQuantity
        },
    ]
    const reviewsList = product_detail?.reviews?.map((r) => ({
        name: r.reviewerName,
        comment: r.comment,
        rating: r.rating
    }))
    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };
    const descriptonData = () => (
        <p>{product_detail?.description}</p>
    )

    const propertyData = () => (
        <List
            bordered
            dataSource={listItem}
            renderItem={(item) => (
                <List.Item>
                    <Typography.Title level={5}>{item.title}</Typography.Title>
                    <Typography.Text>{item.label}</Typography.Text>
                </List.Item>
            )}
        />
    )
    const reviewsData = () => (
        <List
            bordered
            dataSource={reviewsList}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        title={item.name}
                        description={item.comment}
                    />
                    <Rate allowHalf value={item.rating} />
                </List.Item>
            )}
        />
    )
    const contentListNoTitle: Record<string, React.ReactNode> = {
        description: descriptonData(),
        properties: propertyData(),
        reviews: reviewsData()
    };
    return (
        <section className='mt-32'>
            <Card
                style={{ width: '100%' }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
                tabProps={{
                    size: 'middle',
                }}
            >
                {contentListNoTitle[activeTabKey]}
            </Card>
        </section>
    )
}

export default ProductDetailOverview