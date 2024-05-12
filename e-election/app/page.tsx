"use client"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

		const toRout = (path: string) => {
			router.push(path);
		}




	return (
		<section className="flex justify-around">

			<div className="flex flex-col items-right  gap-10 py-10 md:py-10 mt-12 ml-12">
				<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "green" })}>الإلكترونية&nbsp;</h1>
				<h1 className={title()} style={{color:"red"}}>   الانتخابات &nbsp;</h1>
				<br />
				 
				<h2 className={subtitle({ class: "mt-4" })}>
				منصة الانتخابات الإلكترونية: تقنيات متقدمة لعملية اقتراع آمنة وشفافة. انضم إلينا للمشاركة في صناعة مستقبل الديمقراطية في بلدنا.  				</h2>
			    </div>

				<div className="inline-block max-w-lg text-center justify-center">
					<Button
						 
						onClick={() => toRout("/citizen1")}
						className={buttonStyles({ color: "danger", radius: "full", variant: "bordered" })}
					>
						<span >ابدأ الآن</span>
					</Button>
					
				</div>
			</div>
			
			{/* i want to add a reghit section that have a photo  */}
			<div className="inline-block max-w-lg text-center justify-center ">
				<img
					src="imgs/hero.png"
					alt="NextUI hero Image"
					className="w-96 h-96"
				/>
			</div>

				
		</section>
		
	);
}
