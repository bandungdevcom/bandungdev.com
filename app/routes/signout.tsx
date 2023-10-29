import {
	redirect,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from "@remix-run/node"

export async function action({ request }: ActionFunctionArgs) {
	// Clear credential

	return redirect("/signin")
}

export async function loader({ request }: LoaderFunctionArgs) {
	// Clear credential

	return redirect("/signin")
}
