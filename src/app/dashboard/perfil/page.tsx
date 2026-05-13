"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { User, Mail, Phone, MapPin, Shield, Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const [data, setData] = useState<ProfileData>({
    nome: "Paulo da Silva",
    email: "paulo.silva@email.com",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
  });

  const [draft, setDraft] = useState<ProfileData>(data);

  const handleEdit = () => {
    setDraft(data);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(data);
    setIsEditing(false);
  };

  const handleSave = () => {
    setData(draft);
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">
          Meu Perfil
        </h1>
        <p className="text-sus-muted text-lg mt-1">
          Gerencie suas informações pessoais.
        </p>
      </header>

      {/* Toast de sucesso */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 font-semibold"
            role="status"
            aria-live="polite"
          >
            <Check className="w-5 h-5" />
            Dados salvos com sucesso!
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardContent className="p-8">
          {/* Avatar & Nome */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="w-24 h-24 bg-sus-primary/10 rounded-full flex items-center justify-center text-sus-primary shrink-0">
              <User className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{data.nome}</h2>
              <p className="text-sus-muted flex items-center gap-2 mt-1">
                <Shield className="w-4 h-4 text-emerald-500" /> Conta Nível Ouro
                (gov.br)
              </p>
            </div>
          </div>

          {/* Campos - modo Leitura */}
          {!isEditing && (
            <div className="space-y-6">
              <ProfileItem icon={Mail} label="E-mail" value={data.email} />
              <ProfileItem icon={Phone} label="Telefone" value={data.telefone} />
              <ProfileItem icon={MapPin} label="Endereço" value={data.endereco} />
            </div>
          )}

          {/* Campos - modo Edição */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <Input
                label="Nome completo"
                value={draft.nome}
                onChange={(e) => updateField("nome", e.target.value)}
              />
              <Input
                label="E-mail"
                type="email"
                value={draft.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <Input
                label="Telefone"
                type="tel"
                value={draft.telefone}
                onChange={(e) => updateField("telefone", e.target.value)}
              />
              <Input
                label="Endereço"
                value={draft.endereco}
                onChange={(e) => updateField("endereco", e.target.value)}
              />
            </motion.div>
          )}

          {/* Botões de ação */}
          <div className="mt-8 pt-6 flex justify-end gap-3">
            {!isEditing ? (
              <Button variant="outline" onClick={handleEdit}>
                <Pencil className="w-4 h-4 mr-2" />
                Editar Dados
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
        <Icon className="w-5 h-5 text-sus-muted" />
      </div>
      <div>
        <p className="text-sm text-sus-muted font-medium">{label}</p>
        <p className="font-semibold text-sus-foreground">{value}</p>
      </div>
    </div>
  );
}
