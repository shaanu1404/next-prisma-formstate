'use server'

import { revalidatePath } from "next/cache"
import { ZodError, z } from 'zod'
import db from "@/lib/database"
import { capitalize } from "@/lib/utils/text"

export type FieldErrorMessage = {
    type: 'fieldErrors', fieldErrors: z.typeToFlattenedError<any, string>
}
type ErrorMessage = { type: 'error', message?: string }
type SuccessMessage = { type: 'success', message?: string }

export type ResponseMessage = SuccessMessage | ErrorMessage | FieldErrorMessage;

const createPersonSchema = z.object({
    fullname: z.string().min(4, 'Fullname must be atleast 4 characters').max(30, 'Fullname must not exceed 30 characters'),
    email: z.string().email('Invalid email format').min(1, 'Required')
})

export async function createPerson(prevState: any, formdata: FormData) {
    try {
        const newPerson = createPersonSchema.parse(Object.fromEntries(formdata))
        await db.person.create({
            data: {
                fullname: capitalize(newPerson.fullname),
                email: newPerson.email.toLowerCase()
            }
        })
        revalidatePath('/')
        return { type: 'success', message: 'Person created successfully' } satisfies ResponseMessage
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErrors = error.formErrors
            return { type: 'fieldErrors', fieldErrors } satisfies ResponseMessage;
        }
        return { type: 'error', message: 'Failed to create person' } as ResponseMessage
    }
}

export async function deletePerson(formdata: FormData) {
    const personId = formdata.get('personId')
    if (personId) {
        await db.person.delete({ where: { id: +personId } })
    }
    revalidatePath('/')
}