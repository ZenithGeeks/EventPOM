"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

interface Category {
  id: number;
  name: string;
}

export default function CategoryTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    const data = await res.json();
    setCategories(data.categories);
  };

  const createCategory = async () => {
    const res = await fetch("http://localhost:3001/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    const data = await res.json();
    if (!data.error) {
      setNewName("");
      fetchCategories();
      toast.success("Category created successfully");
    } else {
        toast.error("Failed to create category");
    }
  };

  const deleteCategory = async (id: number) => {
    const res = await fetch(`http://localhost:3001/categories/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Category deleted successfully");
      fetchCategories();
    } else {
        toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Card className="w-full shadow-lg border rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Manage Event Categories</CardTitle>
        <p className="text-sm text-muted-foreground">Create and manage event categories for organizers.</p>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-end gap-4">
          <div className="flex flex-col w-full max-w-sm gap-2">
            <Label htmlFor="categoryName">Add New Category</Label>
            <Input
              id="categoryName"
              placeholder="e.g. Technology, Music, Sports"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <Button
            onClick={createCategory}
            className="mt-1 h-10"
            disabled={!newName.trim()}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium text-muted-foreground">{category.id}</TableCell>
                  <TableCell>
                    <Badge>
                        {category.name}
                    </Badge>

                    </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}