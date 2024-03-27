'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1 className="text-2xl font-bold">Hello World</h1>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <Form onSubmit={(e) => {
        e.preventDefault();
        console.log('Form submitted');
      }}>
        <Input type="text" />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
