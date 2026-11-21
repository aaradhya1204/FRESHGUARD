import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Leaf, ShieldCheck, ShoppingCart, Download } from "lucide-react";

export default function AuthPage() {
  const { login, isLoggingIn } = useAuth();
  
  // User Login State
  const [customId, setCustomId] = useState("");
  
  // Admin Login State
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ customId, role: 'user' });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username: adminUsername, password: adminPassword, role: 'admin' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}>
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-lg mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">ExpironGuard</h1>
          <p className="text-muted-foreground">Smart grocery safety & management</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="user" className="text-base">Customer</TabsTrigger>
            <TabsTrigger value="admin" className="text-base">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <Card className="p-8 border-none shadow-xl">
              <form onSubmit={handleUserLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customId" className="text-base">Customer ID (Aadhaar/Mobile)</Label>
                  <div className="relative">
                    <ShoppingCart className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="customId" 
                      placeholder="Enter your ID" 
                      className="pl-10 h-12 text-lg"
                      value={customId}
                      onChange={(e) => setCustomId(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={isLoggingIn}>
                  {isLoggingIn ? <Loader2 className="animate-spin mr-2" /> : "Access Dashboard"}
                </Button>
              </form>
            </Card>
            <p className="text-center mt-6 text-sm text-muted-foreground">
              Demo User ID: <code className="bg-white px-2 py-1 rounded border">user123</code>
            </p>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="p-8 border-none shadow-xl">
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password"
                      className="pl-10 h-11"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={isLoggingIn}>
                  {isLoggingIn ? <Loader2 className="animate-spin mr-2" /> : "Admin Login"}
                </Button>
              </form>
            </Card>
            <p className="text-center mt-6 text-sm text-muted-foreground">
              Demo Admin: <code className="bg-white px-2 py-1 rounded border">admin@gmail.com</code> / <code className="bg-white px-2 py-1 rounded border">admin</code>
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/80 shadow-sm">
          <p className="text-sm text-slate-600 mb-2 font-medium">Using an Android device?</p>
          <a
            href="/download/apk"
            download="ExpironGuard.apk"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-full transition-colors"
          >
            <Download className="h-4 w-4 text-emerald-600" />
            Download Android APK (4.2 MB)
          </a>
        </div>
      </div>
    </div>
  );
}
