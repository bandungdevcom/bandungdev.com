import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => [{ title: "About BandungDev" }]

export default function AboutRoute() {
	return (
		<div>
			<section className="section-auto">
				<header className="space-y-4">
					<h1>About BandungDev</h1>
					<p>Short story on how we are gathering together.</p>
				</header>
			</section>
		</div>
	)
}
