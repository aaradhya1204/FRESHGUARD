import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type InsertProduct } from "@shared/routes";
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, Plus, Trash2, Tag, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { z } from "zod";

// Enhance schema for form handling (string to number conversion, etc)
const formSchema = insertProductSchema.extend({
  price: z.coerce.number().min(1, "Price must be positive"),
  manufacturingDate: z.coerce.date(),
  expiryDate: z.coerce.date(),
  ingredients: z.string().transform(str => str.split(',').map(s => s.trim()).filter(Boolean)),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function AdminDashboard() {
  const { products, isLoading, create, remove } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      nutritionalInfo: "Cal: 100, Prot: 5g, Carbs: 20g",
      ingredients: "",
      qrCodeId: crypto.randomUUID(), // Auto-generate QR
    }
  });

  const onSubmit = (data: ProductFormValues) => {
    // @ts-ignore - zod transform handles string[] for ingredients
    create.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset({
          name: "",
          price: 0,
          nutritionalInfo: "Cal: 100, Prot: 5g, Carbs: 20g",
          ingredients: "",
          qrCodeId: crypto.randomUUID(),
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">Manage products and print QR codes.</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5 mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl><Input placeholder="e.g. Organic Milk" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (paise)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="qrCodeId" render={({ field }) => (
                      <FormItem>
                        <FormLabel>QR ID (Auto)</FormLabel>
                        <FormControl><Input {...field} readOnly className="bg-gray-100" /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="manufacturingDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mfg Date</FormLabel>
                        <FormControl><Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="expiryDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl><Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="nutritionalInfo" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nutritional Info</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="ingredients" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients (comma separated)</FormLabel>
                      <FormControl><Input placeholder="Milk, Vitamin D..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full" disabled={create.isPending}>
                    {create.isPending ? "Adding..." : "Add to Inventory"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-primary font-bold">₹{(product.price / 100).toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => remove.mutate(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg border shadow-sm">
                      <QRCodeSVG value={product.qrCodeId} size={80} />
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2"><Tag className="w-3 h-3" /> ID: {product.qrCodeId.slice(0, 8)}...</div>
                      <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Exp: {format(new Date(product.expiryDate), 'MMM d, yyyy')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
