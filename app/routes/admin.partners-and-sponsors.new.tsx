import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export default function PartnersAndSponsorsNewRoute() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>Partners and Sponsors</h2>
        </div>
      </header>
      <section className="app-section">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add Partners or Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="partners or sponsors name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Link</Label>
                  <Input id="name" placeholder="https://" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="partners-or-sponsors">
                    Partners / Sponsors
                  </Label>
                  <Select>
                    <SelectTrigger id="partners-or-sponsors">
                      <SelectValue placeholder="Partners / Sponsors" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="partners">Partners</SelectItem>
                      <SelectItem value="sponsors">Sponsors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
