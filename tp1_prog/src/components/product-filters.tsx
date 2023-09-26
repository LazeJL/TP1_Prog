"use client";

import { Button } from 'tp-kit/components';
import { TextInput, Checkbox, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormEventHandler, useMemo } from 'react';
import { ProductsCategoryData } from "tp-kit/types";
import { ProductFilterResult } from '@/types';

type Props = {categories: ProductsCategoryData[], onChange : (param : ProductFilterResult) => void}

export function ProductFilters({categories, onChange} : Props) {

    const form = useForm({
        initialValues: {
            categoriesSlug: [],
            search: ""
        }
    })

    function handleFilter(values : ProductFilterResult) {
        onChange(values)
    }

    return (
        <main>
            <form onSubmit={form.onSubmit((values) => handleFilter(values))}>
                <TextInput className='mb-3' id="search" {...form.getInputProps("search")}></TextInput>
                <Checkbox.Group className='flex flex-col gap-3' {...form.getInputProps("categoriesSlug")}>
                    {categories.map((category,index) => <Checkbox key={index} value={category.slug} label={category.name}></Checkbox>)}
                </Checkbox.Group>
                <Button className='mt-5' type="submit">Filter</Button>
            </form>
        </main>
    )
}