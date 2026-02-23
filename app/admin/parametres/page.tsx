"use client"

import { useState } from "react"
import {
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Save,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { adminUser } from "@/lib/data"

export default function AdminParametresPage() {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1">
          Parametres
        </h1>
        <p className="text-muted-foreground">
          Configuration de l&apos;espace administration
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Parametres enregistres avec succes</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Admin Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil administrateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-blue-navy text-xl font-bold">
                AD
              </div>
              <div>
                <p className="font-medium text-foreground">{adminUser.name}</p>
                <p className="text-sm text-muted-foreground">{adminUser.email}</p>
                <p className="text-xs text-violet font-medium mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Super Administrateur
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminName">Nom complet</Label>
              <Input id="adminName" defaultValue={adminUser.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email</Label>
              <Input id="adminEmail" type="email" defaultValue={adminUser.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPhone">Telephone</Label>
              <Input id="adminPhone" type="tel" defaultValue="+225 00 00 00 00 00" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Securite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium text-foreground">Authentification a deux facteurs</p>
                <p className="text-xs text-muted-foreground">Securisez votre compte avec la 2FA</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Nouvelles inscriptions",
                description: "Recevoir un email a chaque nouvelle inscription",
                defaultChecked: true,
              },
              {
                label: "Paiements recus",
                description: "Notification a chaque paiement confirme",
                defaultChecked: true,
              },
              {
                label: "Annulations",
                description: "Etre informe des annulations et remboursements",
                defaultChecked: true,
              },
              {
                label: "Sessions presque completes",
                description: "Alerte quand une session atteint 80% de remplissage",
                defaultChecked: false,
              },
              {
                label: "Rapport hebdomadaire",
                description: "Recevoir un resume chaque lundi matin",
                defaultChecked: false,
              },
            ].map((notif) => (
              <div
                key={notif.label}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{notif.label}</p>
                  <p className="text-xs text-muted-foreground">{notif.description}</p>
                </div>
                <Switch defaultChecked={notif.defaultChecked} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Parametres du site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input id="siteName" defaultValue="Big Five Academy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteEmail">Email de contact</Label>
              <Input id="siteEmail" type="email" defaultValue="contact@bigfive.ci" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sitePhone">Telephone</Label>
              <Input id="sitePhone" type="tel" defaultValue="+225 00 00 00 00 00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteAddress">Adresse</Label>
              <Input id="siteAddress" defaultValue="Abidjan, Cocody - Riviera" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentLink">Lien de paiement Djamo</Label>
              <Input id="paymentLink" defaultValue="https://pay.djamo.com/2bqug" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white gap-2 px-8"
        >
          <Save className="w-4 h-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}
