import {
	redirect,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from "@remix-run/node"

export function action({ request }: ActionFunctionArgs) {
	// Clear credential

	return redirect("/signin")
}

export function loader({ request }: LoaderFunctionArgs) {
	// Clear credential

	return redirect("/signin")
}
