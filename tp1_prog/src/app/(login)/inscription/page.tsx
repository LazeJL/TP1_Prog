"use client"
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, PasswordInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function inscription() {
  const form = useForm({
    initialValues: { name: '', email: '', password: ''},
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    }
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(console.log, handleError)}>
        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')}/>
        <Button type="submit" mt="sm"> Submit </Button>
      </form>
    </Box>
  );
}

