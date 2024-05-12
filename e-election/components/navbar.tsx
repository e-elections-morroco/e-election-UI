import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { useRouter } from "next/navigation";

export const Navbar = () => {
	 
	 const router = useRouter();

	 const toRoute = () => {
		 router.push('/admin');
	 }

	return (
		<NextUINavbar  shouldHideOnScroll maxWidth="sm" className="p-4"  >
		<NavbarBrand>
			<img
				width={80}
				alt="NextUI hero Image"
				src="imgs/Coat_of_arms_of_Morocco.svg.png"
			/>

		</NavbarBrand>
		<NavbarContent className="hidden sm:flex gap-4" justify="center">
		   
		</NavbarContent>
		<NavbarContent justify="end">
		   
		  <NavbarItem>
			<Button onClick={toRoute} size="lg" color="primary" href="/admin" variant="flat">
			   <span style={
				{color: "red"}
			   } >Im Admin</span>
			</Button>
		  </NavbarItem>
		</NavbarContent>
	  </NextUINavbar>
	);
};
