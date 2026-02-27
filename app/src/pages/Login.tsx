import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login({ username: email, password });

      if (success) {
        navigate(ROUTES.home, { replace: true });
      } else {
        setError("Credenciais inválidas");
        setIsLoading(false);
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <>

      <div className="h-screen w-screen overflow-hidden flex bg-background relative">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-full bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div
          className="absolute flex items-center bottom-0 right-1/4 w-[500px] h-full bg-primary/15 rounded-full blur-[120px] -z-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      {/* Left Side - Video */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-[70%] flex items-center relative overflow-hidden"
        style={{ background: "#f3f5f49c" }}
      >
        {/* Video Background */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="inset-0 w-full object-cover z-0"
            style={{ pointerEvents: "none" }}
            onError={() => {
              console.error("Erro ao carregar vídeo de login");
              setVideoError(true);
            }}
            onLoadedData={() => {
              console.log("Vídeo carregado com sucesso");
            }}
          >
            <source src="/capivara-watcher-prototype/login.mp4" type="video/mp4" />
          </video>
        )}

        {/* Fallback background if video fails */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-gray-900 to-black z-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDE1NSw1OCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          </div>
        )}
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 animate-pulse opacity-30 z-10" />
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-[30%] shadow-lg flex items-center justify-center bg-background relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm px-8 relative z-10"
        >
          {/* Logo e Slogan */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-display font-bold text-foreground mb-1">
              CAPIVARA<br></br>WATCHER
            </h1>
            <p className="textm text-muted-foreground">
              Monitoramento do Congresso Nacional
            </p>
          </div>

          {/* Divider */}
          <Separator className="mb-8" />

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Login
            </h2>
            <p className="text-xs text-muted-foreground">Acesse sua conta</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start gap-2 text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="pl-9 h-11"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to={ROUTES.changePassword}
                className="text-xs text-muted-foreground hover:text-green-700 transition-colors font-medium"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-sm shadow-md font-semibold transition-all bg-green-600/70 text-white"
              size="default"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 text-xs text-muted-foreground bg-background">
                ou
              </span>
            </div>
          </div>

          {/* Create Account Link */}
          <div className="text-center">
            <Button
              type="button"
              className="w-full h-10 text-sm font-medium shadow-md border border-border"
              onClick={() => navigate(ROUTES.createAccount)}
            >
              Criar uma conta
            </Button>
          </div>

          {/* Hint */}
          <div className="mt-8 p-3 ">
            <p className="text-xs text-center text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Teste:</span>{" "}
              Use{" "}
              <code className="px-2 py-0.5 bg-background text-primary rounded font-mono text-xs mx-1">
                teste@email.com
              </code>
              e senha{" "}
              <code className="px-2 py-0.5 bg-background text-primary rounded font-mono text-xs mx-1">
                123456
              </code>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
