import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";
import { validarEmail, validarSenha } from "@/utils/helpers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CreateAccount() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validarEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (!validarSenha(formData.password)) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme a senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.email.split("@")[0],
        email: formData.email,
        username: formData.email,
        password: formData.password,
      });

      if (success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(ROUTES.login, { replace: true });
        }, 2000);
      } else {
        setErrors({ general: "Email já cadastrado" });
        setIsLoading(false);
      }
    } catch {
      setErrors({ general: "Erro ao criar conta. Tente novamente." });
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (success) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-foreground mb-2">
            Conta criada com sucesso!
          </h2>
          <p className="text-muted-foreground">
            Redirecionando para o login...
          </p>
        </motion.div>
      </div>
    );
  }

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
        style={{ background: "#f9fbfc" }}
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
              console.error("Erro ao carregar vídeo");
              setVideoError(true);
            }}
            onLoadedData={() => {
              console.log("Vídeo carregado com sucesso");
            }}
          >
            <source src="/beach.mp4" type="video/mp4" />
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

      {/* Right Side - Form */}
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
              CAPIVARA
              <br />
              WATCHER
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitoramento do Congresso Nacional
            </p>
          </div>

          {/* Divider */}
          <Separator className="mb-8" />

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Criar Conta
            </h2>
            <p className="text-xs text-muted-foreground">
              Preencha os dados para começar
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start gap-2 text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{errors.general}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                  className="pl-9 h-11"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Escolha uma senha"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="pl-9 h-11"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Mínimo 6 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="pl-9 h-11"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
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
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 text-xs text-muted-foreground bg-background">
                Já tem conta?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Button
              type="button"
              className="w-full h-10 text-sm font-medium shadow-md border border-border"
              variant="outline"
              onClick={() => navigate(ROUTES.login)}
            >
              Voltar para login
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
