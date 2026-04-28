'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useSendEmail } from '@/hooks/useSendEmail'

// ✅ Zod Schema
const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter valid email'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(5, 'Message is too short'),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const sendEmailMutation = useSendEmail()

  const onSubmit = async (data: FormValues) => {
    try {
      await sendEmailMutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      })

      toast.success('✅ Message sent successfully!')
      form.reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      toast.error(`❌ Error: ${errorMessage}`)
      console.error('Email send error:', error)
    }
  }

  return (
    <Card className="rounded bg-card/40 backdrop-blur-sm  border border-border  p-6 relative ">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Type your message..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={sendEmailMutation.isPending}
              className="w-full bg-primary-color hover:bg-primary-color/90 text-white disabled:opacity-50"
            >
              {sendEmailMutation.isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
