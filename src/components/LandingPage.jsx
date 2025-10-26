import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarClock,
  Check,
  FileText,
  Mail,
  Phone,
  TrendingUp,
  Building2,
  Shield,
  Scale,
  ChevronDown,
  ArrowRight,
  X,
  User,
  Sparkles,
  Zap,
  Target,
  Star,
} from "lucide-react";

// ⚙️ Remplace ces constantes par tes vraies infos
const SITE = {
  brand: "GCL – Expert en gestion",
  city: "Marseille",
  calendlyUrl: "https://calendly.com/votre-identifiant/appel-decouverte", // ← à remplacer
  phone: "+33 6 22 45 92 38",
  email: "laurentgarnero13@aol.com",
  addressHtml: "Marseille",
};

// 🎨 Palette (sobre, rassurante)
const COLORS = {
  primary: "#7c2d12", // violet-700
  primaryLight: "#9333ea", // violet-500
  accent: "#2563eb", // blue-600
  bg: "#0b1324",
  card: "#0f1a33",
  border: "#1f2a44",
};

// 🧩 Composants ultra modernes
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-300/10 to-violet-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
  </div>
);

const AnimatedGrid = () => (
  <div className="absolute inset-0 opacity-30">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      animation: 'grid-move 20s linear infinite'
    }}></div>
    <style jsx>{`
      @keyframes grid-move {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
    `}</style>
  </div>
);

const GlowingCard = ({ children, className = "", glow = true }) => (
  <div className={`group relative ${className}`}>
    {glow && (
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    )}
    <div className="relative backdrop-blur-xl bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/30">
      {children}
    </div>
  </div>
);

const ShimmerButton = ({ children, className = "", ...props }) => (
  <button 
    className={`relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
    {...props}
  >
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9333ea_0%,#7c3aed_50%,#9333ea_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl gap-2 hover:bg-slate-900 transition-colors">
      {children}
    </span>
  </button>
);

const MagicCard = ({ children, className = "" }) => (
  <div className={`group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
    <div className="relative p-6">
      {children}
    </div>
  </div>
);

const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24 relative">
    <div className="mx-auto max-w-6xl px-4">
      {kicker && (
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <p className="text-sm uppercase tracking-widest text-purple-400/90 font-medium">
            {kicker}
          </p>
        </div>
      )}
      {title && (
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <div className="mt-8 text-slate-300">{children}</div>
    </div>
  </section>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/40 text-purple-200",
    premium: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/40 text-yellow-200",
    success: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/40 text-green-200"
  };
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <GlowingCard className={className}>
    {children}
  </GlowingCard>
);

const Input = ({ label, type = "text", id, required, placeholder, value, onChange }) => (
  <label className="block text-sm group">
    <span className="mb-2 block text-slate-200 font-medium">{label}</span>
    <div className="relative">
      <input
        className="w-full rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-slate-900/80 hover:border-slate-500/80"
        type={type}
        id={id}
        placeholder={placeholder}
        aria-label={label}
        required={required}
        value={value}
        onChange={onChange}
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  </label>
);

const Textarea = ({ label, id, required, placeholder, value, onChange }) => (
  <label className="block text-sm group">
    <span className="mb-2 block text-slate-200 font-medium">{label}</span>
    <div className="relative">
      <textarea
        className="min-h-[120px] w-full rounded-xl border border-slate-600/70 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-slate-900/80 hover:border-slate-500/80 resize-none"
        id={id}
        placeholder={placeholder}
        aria-label={label}
        required={required}
        value={value}
        onChange={onChange}
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  </label>
);

const Accordion = ({ items }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <MagicCard key={idx} className="overflow-hidden">
          <button
            className="group w-full text-left"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            <div className="flex items-center justify-between gap-6 p-6">
              <p className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">{it.q}</p>
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ChevronDown
                  className={`relative h-5 w-5 flex-shrink-0 transition-all duration-300 text-purple-400 ${
                    open === idx ? "rotate-180 scale-110" : "rotate-0"
                  }`}
                />
              </div>
            </div>
            <div
              className={`grid transition-all duration-500 ease-out ${
                open === idx ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr] pb-0"
              }`}
            >
              <div className="overflow-hidden px-6">
                <div className="pt-2 pb-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-4"></div>
                  <p className="text-slate-300 leading-relaxed">{it.a}</p>
                </div>
              </div>
            </div>
          </button>
        </MagicCard>
      ))}
    </div>
  );
};

const CookieBar = () => {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    setSeen(localStorage.getItem("consent") === "given");
  }, []);
  if (seen) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[95%] rounded-2xl border border-slate-700/70 bg-slate-900/90 p-4 text-sm text-slate-200 shadow-2xl md:max-w-3xl">
      <div className="flex items-start gap-4">
        <Shield className="mt-1 h-5 w-5" />
        <p>
          Nous utilisons des cookies strictement nécessaires et, avec votre accord, des mesures d'audience.
          <a href="#mentions" className="ml-2 underline">En savoir plus</a>.
        </p>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          className="rounded-xl border border-slate-600 px-3 py-2 hover:bg-slate-800"
          onClick={() => {
            localStorage.setItem("consent", "denied");
            setSeen(true);
          }}
        >
          Refuser
        </button>
        <button
          className="rounded-xl bg-purple-600 px-3 py-2 font-medium text-white hover:bg-purple-500"
          onClick={() => {
            localStorage.setItem("consent", "given");
            setSeen(true);
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  );
};

const LeadMagnet = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-purple-200 hover:bg-purple-500/20"
        onClick={() => setOpen(true)}
      >
        <FileText className="h-4 w-4" /> Télécharger la check‑list gratuite
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 p-4">
          <Card className="max-w-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Check‑list : 20 points de contrôle avant de créer sa société
              </h3>
              <button aria-label="Fermer" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-slate-300">
              Recevez le PDF par email (double opt‑in RGPD).
            </p>
            {sent ? (
              <p className="mt-4 rounded-xl border border-purple-700/40 bg-purple-700/10 p-3 text-purple-200">
                Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.
              </p>
            ) : (
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  // 👉 Ici, branchement à votre outil d'emailing (ex: Brevo/Sendinblue via API)
                  setSent(true);
                }}
              >
                <Input
                  label="Votre email"
                  type="email"
                  required
                  placeholder="vous@domaine.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-500">
                  Recevoir le PDF <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-slate-400">
                  Vos données ne sont utilisées que pour vous envoyer ce contenu et, si vous le souhaitez, notre newsletter. Désinscription en un clic.
                </p>
              </form>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

const ServiceCard = ({ icon: Icon, title, bullets, delay = 0 }) => (
  <MagicCard className={`group hover:scale-105 transition-all duration-500 animate-fade-in-up`} style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-start gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 p-3 text-purple-300 backdrop-blur-sm border border-purple-500/20">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">{title}</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 group/item">
              <div className="relative mt-1">
                <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                <Check className="relative h-4 w-4 flex-shrink-0 text-purple-400" />
              </div>
              <span className="group-hover/item:text-slate-200 transition-colors duration-300">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </MagicCard>
);

export default function LandingPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", sector: "", message: "", consent: false });
  const [status, setStatus] = useState("idle");

  const faq = useMemo(
    () => [
      {
        q: "Qu'est-ce qu'un expert en gestion d'entreprise à Marseille ?",
        a: "Un partenaire opérationnel qui vous aide à structurer, piloter et sécuriser votre entreprise : vision, rentabilité, trésorerie, financements, et organisation au quotidien. Conseil gestion entreprise spécialisé TPE/PME.",
      },
      {
        q: "Combien coûte l'accompagnement création entreprise ?",
        a: "Après un diagnostic gratuit, un devis clair au forfait ou à l'abonnement mensuel selon la mission. L'objectif est un ROI mesurable pour votre pilotage entreprise.",
      },
      {
        q: "Travaillez-vous avec mon expert-comptable à Marseille ?",
        a: "Oui. L'expert en gestion complète le comptable : nous transformons les chiffres en décisions et en plan d'action pour votre redressement entreprise.",
      },
      {
        q: "Accompagnement dirigeant possible à distance ?",
        a: "Oui, en combinant visio, tableau de bord partagé et points réguliers. Déplacements possibles à Marseille et alentours pour le conseil gestion entreprise.",
      },
    ],
    []
  );

  // Calendly embed (non bloquant). Si le script est refusé, on garde un fallback bouton.
  const calendlyRef = useRef(null);
  useEffect(() => {
    const ok = localStorage.getItem("consent") === "given";
    if (!ok) return; // on ne charge qu'avec consentement
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // 👉 Branchez ici votre API Node/Express (/api/contact) avec Nodemailer + hCaptcha/Turnstile
      // const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      // if (!res.ok) throw new Error("Erreur serveur");
      await new Promise((r) => setTimeout(r, 600)); // démo
      setStatus("success");
      setForm({ name: "", email: "", phone: "", sector: "", message: "", consent: false });
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Effects */}
      <FloatingOrbs />
      <AnimatedGrid />
      
      {/* --- Top bar --- */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#accueil" className="group flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold text-sm tracking-wide">
                {SITE.brand} · {SITE.city}
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {[
              { href: "#missions", label: "Missions" },
              { href: "#pourquoi", label: "Pourquoi" },
              { href: "#rdv", label: "Prendre RDV" },
              { href: "#contact", label: "Contact" }
            ].map((item) => (
              <a 
                key={item.href}
                className="relative group text-slate-300 hover:text-white transition-colors duration-300 font-medium" 
                href={item.href}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
              </a>
            ))}
          </nav>
          <ShimmerButton 
            onClick={() => window.open(SITE.calendlyUrl, '_blank')}
            className="hidden md:inline-flex"
          >
            <CalendarClock className="h-4 w-4" />
            Prendre RDV
          </ShimmerButton>
        </div>
      </header>

      {/* --- Hero --- */}
      <section id="accueil" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
        
        <div className="mx-auto max-w-6xl px-4 relative">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="premium">
                  <Star className="h-3 w-3" />
                  Expert en gestion · Marseille
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Expert en gestion d'entreprise à 
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  Marseille
                </span>
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  - Accompagnement création & pilotage
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                <strong>Expert en gestion d'entreprise à Marseille</strong>, j'accompagne les créateurs et dirigeants (TPE/PME) pour clarifier la vision, sécuriser la trésorerie, et améliorer la rentabilité. <span className="text-purple-300 font-semibold">Conseil gestion entreprise</span> sans jargon.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <ShimmerButton onClick={() => window.open(SITE.calendlyUrl, '_blank')}>
                  <CalendarClock className="h-5 w-5" />
                  Prenez rendez‑vous
                </ShimmerButton>
                
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="group relative inline-flex items-center gap-2 rounded-xl border border-slate-600/50 bg-slate-900/50 px-6 py-3 font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-800/50 hover:text-white"
                >
                  <span>Discutons de vos besoins</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                
                <LeadMagnet />
              </div>
              
              <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                {[
                  { text: "Diagnostic gratuit et sans engagement", icon: Target },
                  { text: "Langage simple, concret, humain", icon: User },
                  { text: "Coordination avec votre expert‑comptable", icon: Building2 },
                  { text: "Intervention à Marseille & distance", icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/30 transition-colors">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <item.icon className="relative h-4 w-4 text-purple-400" />
                    </div>
                    <span className="group-hover:text-slate-200 transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <MagicCard className="md:ml-auto max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800/50 flex items-center justify-center border border-slate-600/50">
                    <img 
                      src="/_FCX1441.jpg" 
                      alt="Laurent Garnero - Expert en gestion"
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Laurent</h3>
                    <p className="text-sm text-purple-300">Expert en gestion</p>
                  </div>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  10+ ans d'expérience en pilotage d'entreprise (création, croissance, redressement). Mon rôle : transformer
                  des chiffres en décisions et des décisions en résultats.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">
                    <Building2 className="h-3 w-3" />
                    Réseau GCL
                  </Badge>
                  <Badge variant="default">
                    <TrendingUp className="h-3 w-3" />
                    Culture du ROI
                  </Badge>
                  <Badge variant="premium">
                    <Shield className="h-3 w-3" />
                    Accompagnement humain
                  </Badge>
                </div>
              </MagicCard>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services --- */}
      <Section id="missions" kicker="Expert gestion Marseille" title="Accompagnement création entreprise & pilotage">
        <div className="grid gap-8 md:grid-cols-3">
          <ServiceCard
            icon={FileText}
            title="Création d'entreprise"
            delay={0}
            bullets={[
              "Business plan et prévisionnels crédibles",
              "Choix de structure et cadrage juridique",
              "Financements, aides et premiers indicateurs",
            ]}
          />
          <ServiceCard
            icon={TrendingUp}
            title="Pilotage & redressement"
            delay={200}
            bullets={[
              "Tableau de bord, marges et prix",
              "Trésorerie, BFR et plans d'action",
              "Restructuration, priorités et accompagnement terrain",
            ]}
          />
          <ServiceCard
            icon={Scale}
            title="Transmission & valorisation"
            delay={400}
            bullets={[
              "Préparation à la vente et audit vendeur",
              "Dataroom, KPI et récit de performance",
              "Négociation et accompagnement jusqu'à la signature",
            ]}
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            <strong>Conseil gestion entreprise Marseille</strong> : chaque mission est expliquée simplement avec exemples et schémas lors du diagnostic.
            <span className="block mt-2 text-purple-300 font-medium">Premiers résultats visibles dès 30 jours.</span>
          </p>
        </div>
      </Section>

      {/* --- Pourquoi --- */}
      <Section id="pourquoi" kicker="Pourquoi un expert en gestion ?" title="Un métier mal connu, une valeur très concrète">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <h3 className="text-lg font-semibold text-white">De la donnée ➜ à la décision</h3>
              <p className="mt-2 text-slate-300">
                Nous transformons les chiffres en plan d'action : marges, trésorerie, priorités, responsabilité.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-white">Moins de stress, plus de visibilité</h3>
              <p className="mt-2 text-slate-300">
                Tableau de bord clair, rituels de pilotage et scénarios réalistes pour prendre les bonnes décisions.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-white">Un ROI mesurable</h3>
              <p className="mt-2 text-slate-300">
                Objectifs chiffrés, gains identifiés, suivi simple. On parle résultats, pas jargon.
              </p>
            </Card>
          </div>
          <Card>
            <h3 className="text-lg font-semibold text-white">Comment ça se passe ?</h3>
            <ol className="mt-4 space-y-3 text-slate-300">
              {[
                "Appel de découverte (15–20 min)",
                "Diagnostic offert (1h) : objectifs, chiffres clés, priorités",
                "Proposition claire (forfait/abonnement)",
                "Déploiement et suivi (tableau de bord + points réguliers)",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[2px] inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-600/30 text-sm font-semibold text-purple-200">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <LeadMagnet />
            </div>
          </Card>
        </div>
      </Section>

      {/* --- Calendly --- */}
      <Section id="rdv" kicker="Prendre rendez‑vous" title="Réservez un appel de découverte">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="text-slate-300">
              Choisissez un créneau directement dans mon agenda. L'appel permet de comprendre vos enjeux et de vous donner
              une première feuille de route.
            </p>
            <a
              href={SITE.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-500"
            >
              <CalendarClock className="h-5 w-5" /> Ouvrir Calendly
            </a>
            <p className="mt-2 text-xs text-slate-500">Le widget s'affiche ci‑dessous si vous avez accepté les cookies.</p>
          </Card>
          <Card>
            <div
              ref={calendlyRef}
              className="calendly-inline-widget min-h-[600px] w-full"
              data-url={SITE.calendlyUrl}
              aria-label="Calendly embed"
            />
          </Card>
        </div>
      </Section>

      {/* --- FAQ --- */}
      <Section id="faq" kicker="Questions fréquentes" title="Tout ce que vous voulez savoir">
        <Accordion items={faq} />
      </Section>

      {/* --- Contact --- */}
      <Section id="contact" kicker="Contact" title="Discutons de votre situation">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <form className="space-y-4" onSubmit={onSubmit}>
              <Input
                label="Nom"
                required
                placeholder="Prénom Nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Email"
                  type="email"
                  required
                  placeholder="vous@domaine.fr"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <Input
                label="Secteur d'activité"
                placeholder="Ex : restauration, BTP, services…"
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
              />
              <Textarea
                label="Message"
                required
                placeholder="Parlez‑moi de votre entreprise, de vos objectifs et de vos questions."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <label className="flex items-start gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  required
                  className="mt-1"
                />
                <span>
                  J'accepte que mes données soient utilisées pour me recontacter (RGPD). Voir <a className="underline" href="#mentions">mentions légales</a>.
                </span>
              </label>

              <div className="mt-2 text-xs text-slate-400">Protection anti‑spam proposée : Cloudflare Turnstile / hCaptcha (à brancher).</div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-500 disabled:opacity-60"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Envoi…" : "Envoyer le message"}
              </button>

              {status === "success" && (
                <p className="rounded-xl border border-purple-700/40 bg-purple-700/10 p-3 text-purple-200">
                  Merci ! Votre message a bien été envoyé. Je vous réponds rapidement.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl border border-red-700/40 bg-red-700/10 p-3 text-red-200">
                  Oups, une erreur est survenue. Réessayez plus tard ou contactez‑moi par téléphone.
                </p>
              )}
            </form>
          </Card>

          <div className="space-y-4">
            <Card>
              <h3 className="text-lg font-semibold text-white">Coordonnées</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-purple-400" /> {SITE.phone}</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-purple-400" /> {SITE.email}</li>
                <li className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-400" />
                  <span dangerouslySetInnerHTML={{ __html: SITE.addressHtml }} />
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://linkedin.com/in/laurent-garnero-13016" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 hover:underline">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-white">Témoignages clients</h3>
              <div className="mt-4 space-y-6">
                <div className="border-l-4 border-purple-500/30 pl-4">
                  <blockquote className="text-slate-300 italic leading-relaxed">
                    « Travailler avec Laurent a vraiment marqué un tournant pour moi. Dès nos premiers échanges, il a su cerner mes besoins et m'apporter une vraie clarté sur mes tarifs, mon positionnement et mes objectifs financiers. Son accompagnement, à la fois structuré et très adapté à ma situation, m'a permis de gagner en confiance et de savoir comment attirer mes premiers clients tout en valorisant mon travail.
                    <br /><br />
                    Au-delà de son expertise, c'est quelqu'un de très agréable et sympathique : chaque séance est motivante et rassurante. On repart toujours avec des idées concrètes, un plan clair et surtout l'envie d'agir. Je recommande sincèrement son accompagnement à tous ceux qui veulent développer leur activité avec sérénité et efficacité. »
                  </blockquote>
                  <div className="mt-3 text-sm text-purple-300 font-medium">
                    <div className="font-semibold">Soisick DE CANECAUDE</div>
                    <div>Studio SoaZ - Architecte d'intérieur</div>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500/30 pl-4">
                  <blockquote className="text-slate-300 italic leading-relaxed">
                    « L'accompagnement de Laurent est un vrai atout pour notre coopérative. Avec optimisme et clairvoyance, il nous aide à prendre du recul, à mieux organiser nos actions et à avancer plus sereinement. De plus, son écoute et ses mises en relation avec d'autres partenaires enrichissent notre démarche et ouvrent de nouvelles perspectives pour l'avenir. »
                  </blockquote>
                  <div className="mt-3 text-sm text-purple-300 font-medium">
                    <div className="font-semibold">Julie</div>
                    <div>Directrice - Marseille</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* --- Conseils / Blog (teaser) --- */}
      <Section id="conseils" kicker="Conseils" title="Articles pédagogiques de Laurent">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Le BFR expliqué : la voiture, l'essence et la trésorerie",
              description: "Imagine que ton entreprise est une voiture. Le BFR, c'est l'essence qui te permet d'atteindre ta destination sans tomber en panne. Une explication simple et imagée d'un concept essentiel.",
              url: "https://www.linkedin.com/pulse/le-bfr-expliqu%C3%A9-la-voiture-lessence-et-tr%C3%A9sorerie-laurent-garnero-rupqf/"
            },
            {
              title: "L'effet domino d'un retard de paiement",
              description: "Un simple retard de paiement peut paraître anodin, mais dans une petite entreprise, c'est souvent l'effet domino : trésorerie tendue, relations dégradées, stress permanent...",
              url: "https://www.linkedin.com/posts/laurent-garnero-13016_gestion-pme-cashflow-activity-7376133292020019200-8faT"
            },
            {
              title: "5 chiffres qui peuvent sauver votre entreprise",
              description: "Découvrez les indicateurs clés à surveiller pour anticiper les difficultés et prendre les bonnes décisions au bon moment. Des chiffres simples mais essentiels.",
              url: "https://www.linkedin.com/posts/laurent-garnero-13016_5-chiffres-qui-peuvent-sauver-votre-entreprise-activity-7368538257451675648-eHcx"
            }
          ].map(
            (article, idx) => (
              <Card key={idx} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                  <p className="mt-2 text-slate-300">
                    {article.description}
                  </p>
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-purple-300 hover:underline">
                  Lire sur LinkedIn <ArrowRight className="h-4 w-4" />
                </a>
              </Card>
            )
          )}
        </div>
        <p className="mt-4 text-sm text-slate-400">Articles publiés sur LinkedIn par Laurent Garnero, expert en gestion d'entreprise à Marseille.</p>
      </Section>

      {/* --- Footer / Mentions --- */}
      <footer id="mentions" className="border-t border-slate-800/60 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} {SITE.brand}. Tous droits réservés — Marseille.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Mentions légales · Politique de confidentialité · RGPD (bannières cookies, finalités, durée et droits d'accès).
              </p>
            </div>
            <div className="text-sm text-slate-400">
              <p>Ce site n'utilise des traceurs qu'avec votre consentement. Analytics recommandé : Matomo/Umami auto‑hébergé.</p>
            </div>
          </div>
        </div>
      </footer>

      <CookieBar />

      {/* --- JSON‑LD minimal pour le SEO local --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: `${SITE.brand}`,
            areaServed: "Marseille",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Marseille",
              addressCountry: "FR",
            },
            url: typeof window !== "undefined" ? window.location.href : "",
            email: SITE.email,
            telephone: SITE.phone,
            sameAs: [],
          }),
        }}
      />
    </div>
  );
}

