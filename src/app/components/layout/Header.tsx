"use client"
import React, { useState,useEffect } from "react";
import { Html5TwoTone, AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from 'next/link';
import { fetchCategories } from "@/utils/api-fetchers";
import { Category } from "@/utils/types";


type MenuItem = Required<MenuProps>["items"][number];
async function fetcher() {
  const result = await fetchCategories();
  return result;
}


const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const [cat, setCat] = useState<MenuItem[] | undefined>();
  async function getCategories() {
    const data = await fetcher();
    const results = Array.isArray(data) ? data : [];
    const subItems = results.map(r => {
      return ({
        key: r.slug,
        label: (
          <Link href={`/products/${r.slug}`} rel="noopener noreferrer">
            {r.name}
          </Link>
        ),
      })
    });
    setCat(subItems);
  }

  useEffect(() => {
    getCategories();
  }, [])
  

  const items: MenuItem[] = [
    {
      key: 'home',
      label: (
        <Link href="/" rel="noopener noreferrer">
          Store
        </Link>
      ),
      icon: <Html5TwoTone />
    },
    {
      key: 'categories',
      label: "Categories",
      children: cat
    }
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <header>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </header>
  );
};

export default Header;
