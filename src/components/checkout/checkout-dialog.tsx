"use client";

import { useState, useEffect, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Copy,
  Check,
  Clock,
  Shield,
  QrCode,
  Loader2,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { generatePixBRCode, formatBRL, PIX_KEY } from "@/lib/pix";
import { useRouter } from "@/lib/router";
import { toast } from "sonner";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  amount: number;
  redirectSlug: string;
  buyerNameLabel?: string;
}

type PaymentStep = "details" | "qr" | "processing" | "done";

export function CheckoutDialog({
  open,
  onOpenChange,
  title,
  description,
  amount,
  redirectSlug,
}: CheckoutDialogProps) {
  const { navigate } = useRouter();
  const [step, setStep] = useState<PaymentStep>("details");
  const [copied, setCopied] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  // Gera o código PIX somente quando necessário (e muda se amount mudar)
  const pixCode = useMemo(
    () =>
      generatePixBRCode({
        amount,
        description: description.substring(0, 50),
        buyerName,
      }),
    [amount, description, buyerName]
  );

  // Reseta o estado quando fecha
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("details");
        setCopied(false);
        setBuyerName("");
        setBuyerEmail("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast.success("Código PIX copiado! Cole no app do seu banco.");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Não foi possível copiar. Selecione manualmente.");
    }
  };

  const handleProceedToQR = () => {
    if (!buyerName.trim()) {
      toast.error("Informe seu nome completo.");
      return;
    }
    if (!buyerEmail.trim() || !buyerEmail.includes("@")) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    setStep("qr");
  };

  const handleSimulatePayment = () => {
    setStep("processing");
    // Simula o "retorno automático" do Mercado Pago após confirmação do PIX.
    // Em produção, este passo seria substituído pelo webhook do Mercado Pago.
    setTimeout(() => {
      setStep("done");
    }, 2500);
  };

  const handleConfirmSuccess = () => {
    onOpenChange(false);
    navigate({ name: "sucesso", slug: redirectSlug });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glass-strong border-violet-500/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            {step === "details" && <Info className="h-5 w-5 text-violet-400" />}
            {step === "qr" && <QrCode className="h-5 w-5 text-violet-400" />}
            {step === "processing" && <Loader2 className="h-5 w-5 text-violet-400 animate-spin" />}
            {step === "done" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            {step === "details" && "Confirme seus dados"}
            {step === "qr" && "Pague com PIX"}
            {step === "processing" && "Processando pagamento..."}
            {step === "done" && "Pagamento confirmado!"}
          </DialogTitle>
          <DialogDescription>
            {step === "details" && title}
            {step === "qr" && "Escaneie o QR Code ou copie o código abaixo"
              .concat(", o valor será creditado automaticamente.")}
            {step === "processing" && "Aguardando confirmação do banco..."}
            {step === "done" && "Tudo certo! Seu acesso foi liberado."}
          </DialogDescription>
        </DialogHeader>

        {/* STEP: DETAILS */}
        {step === "details" && (
          <div className="space-y-4 py-2">
            <div className="rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Curso</span>
                <span className="text-sm font-medium text-right max-w-[60%]">{title}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Valor</span>
                <span className="text-xl font-bold text-emerald-400">{formatBRL(amount)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Nome completo</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Seu nome"
                  className="mt-1 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">E-mail</label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="mt-1 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  O acesso ao curso será enviado para este e-mail.
                </p>
              </div>
            </div>

            <Button
              onClick={handleProceedToQR}
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
            >
              Gerar PIX
            </Button>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Pagamento seguro via PIX. Dados protegidos.</span>
            </div>
          </div>
        )}

        {/* STEP: QR */}
        {step === "qr" && (
          <div className="space-y-4 py-2">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-lg">
                <QRCodeCanvas
                  value={pixCode}
                  size={220}
                  level="M"
                  marginSize={1}
                  imageSettings={{
                    src:
                      "data:image/svg+xml;utf8," +
                      encodeURIComponent(
                        `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect width='40' height='40' rx='8' fill='#7C3AED'/><text x='20' y='27' text-anchor='middle' font-size='20' fill='white' font-family='sans-serif' font-weight='bold'>AI</text></svg>`
                      ),
                    height: 36,
                    width: 36,
                    excavate: true,
                  }}
                />
              </div>

              <div className="w-full rounded-lg bg-card/50 border border-border p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Valor</span>
                  <span className="text-lg font-bold text-emerald-400">{formatBRL(amount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Destinatário</span>
                  <span className="text-xs font-medium">AI SCHOOL</span>
                </div>
              </div>

              <div className="w-full">
                <label className="text-xs text-muted-foreground">PIX Copia e Cola</label>
                <div className="mt-1 flex items-stretch gap-2">
                  <input
                    readOnly
                    value={pixCode}
                    className="flex-1 rounded-md border border-border bg-background/50 px-3 py-2 text-xs font-mono"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopyPix}
                    variant={copied ? "default" : "secondary"}
                    className={copied ? "bg-emerald-500 text-white" : ""}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="w-full rounded-md bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-100/90">
                  Após pagar, clique em <strong>&quot;Já paguei&quot;</strong> para
                  confirmar. O retorno é automático assim que o banco confirma o PIX.
                </p>
              </div>

              <Button
                onClick={handleSimulatePayment}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Já paguei, Confirmar
              </Button>
            </div>
          </div>
        )}

        {/* STEP: PROCESSING */}
        {step === "processing" && (
          <div className="py-10 flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-violet-400 animate-spin" />
            <p className="text-sm text-muted-foreground">
              Aguardando confirmação do banco...
            </p>
            <p className="text-[11px] text-muted-foreground/70">
              Em produção, este passo é substituído pelo webhook automático do Mercado Pago.
            </p>
          </div>
        )}

        {/* STEP: DONE */}
        {step === "done" && (
          <div className="py-6 flex flex-col items-center gap-4 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold">Pagamento confirmado!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Enviamos os detalhes para <strong>{buyerEmail}</strong>.
                Clique abaixo para acessar sua área do aluno.
              </p>
            </div>
            <Button
              onClick={handleConfirmSuccess}
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
            >
              Acessar área do aluno
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
