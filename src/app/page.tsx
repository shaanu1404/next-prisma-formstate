import { createPerson } from "@/lib/actions/personActions";
import { Button } from "@/lib/components/Button";
import { CreatePersonForm } from "@/lib/components/CreatePersonForm";
import { DeletePersonForm } from "@/lib/components/DeletePersonForm";
import db from "@/lib/database";

async function getPersons() {
  const persons = await db.person.findMany();
  return persons;
}

export default async function Home() {
  const persons = await getPersons();

  return (
    <main className="container mx-auto px-4 md:px-0 py-2">
      <h1 className="font-medium text-xl">Event Attendees</h1>
      <hr className="my-2 border-t border-t-green-600" />
      <CreatePersonForm />
      <ul className="space-y-3">
        {persons.map((person) => (
          <li
            key={person.id}
            className="px-4 py-3 bg-gray-900/30 border-l-2 border-l-green-600 cursor-pointer hover:bg-gray-900/50 flex items-center justify-between"
          >
            <div>
              <h2 className="font-medium">{person.fullname}</h2>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
            <DeletePersonForm id={person.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
