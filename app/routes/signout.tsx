import {
	redirect,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from "@remix-run/node"

// eslint-disable-next-line require-await
export async function action ({ request }: ActionFunctionArgs) {
	// Clear credential

	return redirect("/signin")
}

// eslint-disable-next-line require-await
export async function loader({ request }: LoaderFunctionArgs) {
	// Clear credential

	return redirect("/signin")
}
