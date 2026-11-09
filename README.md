# Ayham Ashram — Portfolio & CV Master Guide

> هاد الملف هو **المرجع الأساسي** لبناء البورتفوليو والـ CV.
> أي قرار تصميمي أو محتوى منكتبو لقدام لازم يرجع لهون.
> الحالة: **مرحلة التخطيط والمحتوى** — آخر تحديث: 2026-11-09

---

## 0. الخلاصة بسطر واحد (Positioning)

**Full-Stack Engineer بيبني أنظمة SaaS متعددة المستأجرين (Multi-Tenant) قابلة للتوسع — من قاعدة البيانات لتطبيق الموبايل، وشغّالة فعلياً بالإنتاج.**

هاد هو "الخيط" اللي بيربط كل شغلك. أغلب المطورين بيعرضوا "مشاريع"، إنت عندك شي أندر:

1. **منتج حقيقي مستخدم من +11,000 طالب** (مش مشروع تجريبي).
2. **نموذج عمل خاص فيك** (اشتراك + نسبة عن كل مكتبة) — يعني إنت مو بس مبرمج، إنت **Product Builder**.
3. **عمق معماري**: Multi-tenancy، فصل طبقات، Compound Pattern، تصميم داتابيس قابل للتوسع، أرشفة زمنية.
4. **End-to-end ownership**: Backend + Web Dashboard + Mobile App + CI/CD + Domain + Deploy.

> 🎯 الرسالة اللي لازم يطلع فيها أي حدا بيفتح البورتفوليو:
> **"هاد الشخص بيقدر يستلم فكرة ويطلعها نظام كامل، نضيف، وشغّال لآلاف المستخدمين."**

### عناوين مقترحة (Headline)
- `Full-Stack Engineer — I build scalable multi-tenant SaaS, end to end.`
- `I architect systems that scale — from database schema to mobile app.`
- عربي: `مهندس Full-Stack — أبني أنظمة SaaS قابلة للتوسع، من قاعدة البيانات حتى تطبيق الموبايل.`

---

## 1. المعلومات الأساسية

| البند | القيمة |
|---|---|
| الاسم | Ayham Ashram — أيهم أشرم |
| المسمى | Full-Stack Developer (Web & Mobile) |
| التعليم | هندسة معلوماتية — الجامعة الافتراضية السورية (SVU) |
| الموقع | سوريا (حلب؟ — ❓ للتأكيد) |
| GitHub | https://github.com/AyhamAm10 |
| LinkedIn | https://www.linkedin.com/in/ayham-ashram-9162bb28b |
| الدومين الشخصي | `ayhamashram.me` (مستخدم لـ `course.` و `markaz.`) → **البورتفوليو المنطقي يكون على `ayhamashram.me` نفسه** |

---

## 2. المهارات (Skills Matrix)

### Backend
- **Node.js** (Express / ❓ NestJS؟)
- **TypeORM** — entities, relations, migrations, query builder
- **PostgreSQL** — تصميم schema قابل للتوسع، استعلامات SQL متقدمة، أرشفة حسب الفترات الزمنية
- **MySQL**
- REST APIs، Authentication & Authorization، Roles & Permissions
- Real-time: Chat، Notifications (❓ Socket.io / WebSockets / Push؟)

### Frontend (Web)
- **React**، **Next.js**
- **Framer Motion** — animation
- **Three.js / 3D** (❓ React Three Fiber؟)
- Admin dashboards
- Layered architecture، **Compound Components Pattern**

### Mobile
- **React Native** + **Expo**
- تطبيقات منشورة على Google Play

### Architecture & System Design ⭐ (نقطة قوتك الأساسية)
- **Multi-Tenant SaaS architecture**
- Separation of concerns / Layered architecture (Controller → Service → Repository)
- Scalable & maintainable codebases
- Database design for extensibility (مثال: إضافة ألعاب جديدة بـ AM Arena بدون أي تأثير على الداتا)
- Data archiving strategy (فصل البيانات حسب الفترة الزمنية بدون إرهاق الداتابيس)

### DevOps
- **CI/CD** — GitHub Actions → **Azure** server
- Deployment، ربط Domains، تنظيم سير التعديلات (branches / reviews)
- Vercel

### Soft / Business
- بناء منتج من الصفر وتسويقه بنموذج اشتراك
- التعامل المباشر مع عملاء (كليات، معاهد، مكاتب عقارية)

---

## 3. الخبرة العملية (Experience)

> ⚠️ قرار متفق عليه: **ما منكتب تواريخ بالبورتفوليو.** بالـ CV عادةً التواريخ مطلوبة — شوف القسم 8.

### 3.1 University Library Platform — Founder & Lead Engineer *(مشروع خاص — حالي)*
القسم الكامل بالمشاريع (4.1). هاد **أهم شي بتملكه** ولازم ينعرض كـ "خبرة" مش بس "مشروع".

### 3.2 ISS Group — Full-Stack Developer
- **نظام معهد العلماء — حلب**
- **نظام معهد المنارة — حلب**
- كل نظام بيتضمن: **نظام إدارة + نظام محاسبة + تطبيق أندرويد للأهالي/الطلاب + تطبيق أندرويد للأساتذة**.
- العرض: **Slider صور** (الداشبورد مو للعرض العام).

### 3.3 ITM — Full-Stack Developer *(حوالي 6 أشهر)*
- مشروع **ITM Core**: نظام **CRM + POS** — https://core.itmd-b1.com/
- ❓ شو كان دورك بالزبط؟ (موديولات اشتغلت عليها)

### 3.4 Micro Beaver — Full-Stack Developer *(حوالي سنتين)*
- مشروع **korrasat.ai**: منصة بتولّد **عروض تقديمية فنية بالذكاء الاصطناعي**.
- تعلمت وطبّقت:
  - بناء أنظمة معقدة بـ **Multi-Tenant services**
  - بالفرونت: **فصل الطبقات** و **Compound Pattern**
- 💬 الجملة اللي بتلخصها: *"المكان اللي نقلني من مبرمج بيكتب كود شغّال لمهندس بيبني أنظمة قابلة للتوسع والصيانة."*

### 3.5 Freelance — Backend Developer
- **Ya Suria** (B2B عقاري) و **MyCar** (بيع وتأجير سيارات) — تفاصيل بالقسم 4.

---

## 4. المشاريع (Case Studies)

> كل مشروع رئيسي لازم ينعرض كـ **Case Study** مش مجرد كرت:
> **المشكلة → دوري → الحل التقني → التحديات → النتيجة/الأثر → التقنيات → الروابط.**

### ترتيب العرض المقترح (Tiers)

| Tier | المشروع | ليش |
|---|---|---|
| ⭐ Flagship | University Library Platform | منتج حقيقي، +11K مستخدم، Multi-tenant، بزنس خاص فيك، أفضل كود عندك |
| ⭐ Flagship | AM Arena | مشروع end-to-end كامل لحالك، real-time، CI/CD، Azure |
| Featured | SaaS Institute Platform | استمرار لنفس الخبرة (In Progress) — بيبيّن إنك عم تبني منتج تاني |
| Featured | korrasat.ai (Micro Beaver) | AI + شركة + Multi-tenant |
| Featured | Institute Systems (ISS Group) | أنظمة إدارة + محاسبة + تطبيقين |
| Selected | ITM Core | CRM/POS |
| Selected | Ya Suria | تطبيق منشور على Google Play |
| Selected | MyCar | Backend كامل من الصفر |
| Selected | Courses Platform | Next.js + 3D + Framer Motion — بيبيّن حسّك البصري |
| Lab | Damac / Apple / 3D Portfolio | تجارب UI و 3D |

---

### 4.1 ⭐ University Library Platform — "Markaz"
**النوع:** Multi-Tenant SaaS — Web Dashboard + Mobile App + Backend
**الدور:** Founder — Architecture, Backend, Dashboard, Mobile, Deploy (كل شي)

**المشكلة:** مكتبات الكليات (التربية، الصيدلة، العلوم، الآداب) كانت شغالة يدوي — توزيع المحاضرات والخدمات الطلابية بدون نظام.

**الحل:**
- منصة **Multi-Tenant**: كل مكتبة = tenant مستقل ببياناته.
- تطبيق موبايل للطلاب بيوصلهم المحاضرات وكل الخدمات الطلابية.
- لوحة تحكم للمكاتب.
- **معالجة SQL متقدمة** للأرشفة: كل فترة زمنية (فصل/سنة) محفوظة بأرشيف، **بدون تداخل بالبيانات وبدون ما تثقل السجلات القديمة على الداتابيس**.

**الأثر (الأرقام هي اللي بتبيع):**
- **+11,000 طالب وطالبة** عم يستخدموا النظام.
- **4 كليات / مكاتب**.
- **نموذج عمل**: اشتراك + نسبة عن كل مكتبة بتنضاف → منتج مربح مش بس كود.

**الروابط:**
- Dashboard: https://markaz.ayhamashram.me/
- Download: https://markaz.ayhamashram.me/download
- Backend Architecture (public — شرح شامل للـ pattern المتبع): https://github.com/AyhamAm10/Markaz-backend-Architecture
- App: https://github.com/AyhamAm10/University-library-platform-Application
- ~~Backend source~~ → صار **Private** (القرار 7.1)

**أفكار للعرض بالبورتفوليو:**
- عدّاد حي `11,000+ students` بالـ Hero أو ببداية الـ case study.
- **Diagram تفاعلي للـ Multi-tenancy** (Tenants → Shared core → Isolated data).
- شرح بصري لفكرة **الأرشفة الزمنية** (timeline بيتقسم لفترات).
- Screenshots للتطبيق بإطار موبايل + للداشبورد.

> ⚠️ **ما منكتب "قيّمه الذكاء الاصطناعي ضمن أفضل 10%"** — هالجملة بتضعّف المصداقية بدل ما تقويها. خلّي **الكود نفسه والأرقام** يحكوا. (شوف القسم 7 بخصوص نشر الكود.)

---

### 4.2 ⭐ AM Arena — منصة ستريمرز وبطولات ألعاب إلكترونية
**النوع:** Mobile App (React Native + Expo) + Backend (Node.js + PostgreSQL) + Admin Dashboard
**الدور:** Solo — كل شي من الصفر

**الميزات:**
- نظام **ألقاب (Titles/Badges)**
- **إشعارات**
- **قنوات تواصل بتنشأ تلقائياً ومرتبطة بالبطولات**
- **Chat** + نظام **أصدقاء**
- **Reels**
- **تصويت عام** + **تصويت خاص بالبطولات**
- **Admin Dashboard**

**الهندسة:**
- قاعدة بيانات مصممة لـ **إضافة ألعاب جديدة بدون أي تأثير على الداتا الموجودة** (extensible schema).
- Logic مقسوم لطبقات لضمان التوسع.
- **CI/CD Pipeline**: GitHub → Azure Server، مع تنظيم لسير التعديلات.
- ربط بدومين.

**الروابط:**
- App: https://github.com/AyhamAm10/am-arena
- Backend / Architecture: https://github.com/AyhamAm10/AM-Arena-Architecture

**أفكار للعرض:** فيديو قصير / GIF للتطبيق، diagram للـ pipeline، شرح لتصميم الـ schema القابل للتوسع.

---

### 4.3 SaaS Institute Platform *(In Progress)*
**النوع:** Multi-Tenant SaaS لإدارة المعاهد — Backend + Dashboard
**الفكرة:** نفس نظافة الكود ومنهجية Markaz، بس لسوق المعاهد.
- Backend: https://github.com/AyhamAm10/SaaS-Institute-Platform-Backend
- Dashboard: https://github.com/AyhamAm10/SaaS-Institute-Platform-Dashboard
- ✅ موافق على نشرهم.
- العرض: بادج `Building now` — بيعطي إحساس إنك active.

---

### 4.4 korrasat.ai — Micro Beaver
- منصة توليد عروض فنية بالـ AI.
- Multi-tenant services، Layered frontend، Compound Pattern.
- ❓ رابط المنصة؟ صور؟ شو الأجزاء اللي كانت مسؤوليتك؟

### 4.5 Institute Management Systems — ISS Group
- **معهد العلماء** و **معهد المنارة** — حلب.
- إدارة + محاسبة + تطبيق أهالي/طلاب + تطبيق أساتذة.
- العرض: **Gallery / Slider** صور (بدون رابط). ❓ بدنا Screenshots.

### 4.6 ITM Core — CRM & POS
- https://core.itmd-b1.com/
- ❓ دورك، والموديولات.

### 4.7 Ya Suria — B2B Real Estate *(Freelance — Backend)*
- المستخدمين بينشئوا **مكاتب عقارية** وبيديروا عقاراتهم.
- Backend كامل من الصفر: Node.js + TypeORM.
- Google Play: https://play.google.com/store/apps/details?id=com.yasuriaapp.ya_suria

### 4.8 MyCar — بيع وتأجير سيارات *(Freelance — Backend)*
- Backend كامل من الصفر: Node.js + TypeORM.
- https://github.com/AyhamAm10/myCar
- غير منشور على Google Play.

### 4.9 Courses Platform — منصة الكورسات الشخصية
- Next.js + **3D materials** + **Framer Motion**.
- https://course.ayhamashram.me/
- بيثبت إنك **مش بس Backend** — عندك حس بصري و motion.

### 4.10 Lab / Playground — تجارب UI و 3D
| المشروع | الرابط |
|---|---|
| Damac (UI study) | https://damac-xvsm.vercel.app/ |
| Apple (3D product study) | https://apple-sigma-one.vercel.app/ |
| 3D Portfolio | https://3d-protfolio-three.vercel.app/ |

**القرار:** منحطهن **بقسم صغير منفصل اسمو `Lab` / `Playground`** بشكل خفيف (thumbnails صغيرة أو شريط أفقي)، مع وصف صريح إنهن **تجارب تعلم UI/3D**:
- ✅ بيبيّنوا شغفك بالواجهات والـ 3D.
- ✅ ما بيضاربوا مع المشاريع الحقيقية لأنهن مفصولين.
- ❌ ما منقدّمهن كشغل لعملاء (Damac و Apple علامات تجارية حقيقية → لازم يكون واضح إنهن *UI studies*).

---

## 5. الشهادات

| الشهادة | الجهة | المنصة |
|---|---|---|
| Back-End Development (Professional Certificate) | IBM | Coursera |
| Front-End Developer — React (Professional Certificate) | Meta | Coursera |

❓ روابط التحقق (credential URLs) للشهادتين.

---

## 6. استراتيجية البورتفوليو

### 6.1 الجمهور (❓ للتأكيد)
1. شركات توظيف (Remote / خليج / أوروبا) — بدهم يشوفوا **عمق تقني + architecture**.
2. عملاء SaaS (معاهد، كليات، مكاتب) — بدهم يشوفوا **منتجات شغالة وأرقام**.

### 6.2 الهيكل المقترح للصفحة
1. **Hero** — الاسم + headline + عدّاد `11,000+ students served` + CTA.
2. **What I build** — 3 أعمدة: SaaS Platforms / Mobile Apps / System Architecture.
3. **Flagship Case Studies** — Markaz + AM Arena (عرض غني، scroll storytelling).
4. **More Work** — باقي المشاريع ككروت.
5. **Architecture Philosophy** — قسم مميز بيشرح طريقة تفكيرك (layers, multi-tenancy, scalability) — **هاد اللي بيفرّقك عن أي بورتفوليو تاني.**
6. **Experience** — بدون تواريخ.
7. **Lab** — التجارب.
8. **Stack** + **Certificates**.
9. **Contact**.

### 6.3 الفكرة المميزة (للنقاش بالخطوة الجاية)
بما إنك **مهندس أنظمة**، البورتفوليو نفسه ممكن **يتصمم كأنو نظام** — مثلاً:
- كل مشروع = "tenant" أو "service" بـ architecture map تفاعلية.
- أو تجربة scroll بتبلش من **قاعدة البيانات** وبتطلع طبقة طبقة لحد **الواجهة** (Database → API → Dashboard → Mobile) — نفس رحلة شغلك.
> هاد بس اتجاه أولي — منقرر الهوية البصرية سوا.

### 6.3.1 الهوية البصرية — "Oxblood Noir" (مستوحاة من الصورة الشخصية)
الصورة: بدلة سودا، كرافة **burgundy/oxblood**، قميص أبيض، ساعة ستيل، خلفية مدينة دافية مع bokeh عنبري، وإضاءة سينمائية.
الباليت مأخوذة **من الصورة نفسها**، فالصورة والموقع بيطلعوا قطعة وحدة. وهي بعيدة عن البنفسجي/النيون/الأزرق المستهلكين بالبورتفوليوهات:

| Token | Hex | الاستخدام |
|---|---|---|
| `--ink` | `#0E0B0A` | الخلفية — أسود دافي (مش `#000`) |
| `--espresso` | `#1A1412` | Surfaces / Cards |
| `--umber` | `#2A211D` | Borders / dividers |
| `--oxblood` | `#7A1F2B` | الأكسنت الأساسي (لون الكرافة) |
| `--claret` | `#A3364A` | Hover / focus / روابط |
| `--amber` | `#C9945B` | ضوء الـ bokeh — glow، أرقام، تفاصيل صغيرة |
| `--bone` | `#EDE6DC` | النص الأساسي — أبيض دافي |
| `--steel` | `#8E979C` | النص الثانوي، metadata |

القاعدة: 85% ink/espresso، 10% bone، 5% oxblood + amber. الأكسنت **نادر** وكرمال هيك بيلفت النظر.

### 6.4 اللغة
❓ عربي / إنجليزي / الاتنين مع RTL. (التوصية: **إنجليزي أساسي + عربي اختياري** إذا الجمهور شركات برّا.)

---

## 7. قرارات مهمة

### 7.1 نشر كود مشروع المكتبة (Markaz) ✅ محسوم
> **القرار:** الباك صار Private، والـ repo العام البديل هو https://github.com/AyhamAm10/Markaz-backend-Architecture
السؤال: بحطّ الكود عام ولا بينسرق؟
**التوصية:**
- المشروع **مربح وفيه بزنس خاص فيك** → كود كامل public = أي حدا فيه ينسخ المنتج وينافسك فيه بنفس السوق.
- الحل الوسط (الأفضل):
  1. خلّي الـ repos **Private**.
  2. اعمل repo عام فيه **Architecture Docs** (diagrams + شرح القرارات + مقتطفات مختارة من الكود) — متل ما عملت بـ `AM-Arena-Architecture`.
  3. بالبورتفوليو اكتب: *"Source available on request for hiring teams"* وأعطي access للشركات الجدية.
- إذا قررت تخليه public: حط **LICENSE "All Rights Reserved"** (مش MIT)، وتأكد إنو ما في **`.env` / secrets / بيانات طلاب** بالـ history.

### 7.2 سنوات الخبرة ✅ محسوم
- عندك **5 سنين** بالمجال، وفي شركات قبل 2024 ما منحتاج نذكرها كلها.
- بالـ CV: `5+ years`. وإذا انسألت بالمقابلة، خليك جاهز تذكر شركة أو تنتين من قبل 2024.
- بالبورتفوليو الأرقام اللي بتحكي هي: `5+ years`، `11,000+ students`، `4 faculties`، `10+ projects shipped`.
---

## 8. مسودة الـ CV (English)

> CV بصفحة واحدة، ATS-friendly. التواريخ بالـ CV موجودة لأن مسؤولي التوظيف بيتوقعوها — ❓ إذا بدك نشيلها منحكي.

```
AYHAM ASHRAM
Full-Stack Engineer — Web & Mobile | Multi-Tenant SaaS
ayhamashram.me · github.com/AyhamAm10 · linkedin.com/in/ayham-ashram-9162bb28b · [email] · [phone]

SUMMARY
Full-stack engineer with 5+ years building production systems end to end — from database
design to mobile apps. Specialized in scalable multi-tenant SaaS architecture with Node.js,
TypeORM, PostgreSQL, React, Next.js and React Native. Founder of a university library
platform currently serving 11,000+ students across 4 faculties.

SKILLS
Backend:      Node.js, TypeORM, PostgreSQL, MySQL, REST APIs, Auth & RBAC, Real-time (chat, notifications)
Frontend:     React, Next.js, Framer Motion, Three.js, Compound Components, Layered Architecture
Mobile:       React Native, Expo (published on Google Play)
Architecture: Multi-tenant SaaS, Scalable schema design, Data archiving strategies, Clean layering
DevOps:       CI/CD (GitHub Actions), Azure, Vercel, Domain & deployment management

EXPERIENCE
Founder & Lead Engineer — University Library Platform (Markaz)            2025 – Present
- Designed and built a multi-tenant SaaS (backend, admin dashboard, mobile app) digitizing
  libraries of 4 university faculties.
- Serving 11,000+ students with lectures and student services through the mobile app.
- Engineered a period-based SQL archiving strategy that isolates academic terms, prevents data
  overlap and keeps the live database lean.
- Run the product on a subscription + revenue-share model per onboarded library.

Full-Stack Developer — ISS Group                                          [dates]
- Built management and accounting systems for Al-Ulama and Al-Manara institutes (Aleppo),
  including Android apps for parents/students and for teachers.

Full-Stack Developer — ITM                                               [~6 months]
- Contributed to ITM Core, a CRM & POS platform.

Full-Stack Developer — Micro Beaver                                       Jan 2024 – Dec 2025
- Worked on korrasat.ai, an AI-powered platform generating artistic presentations.
- Built complex multi-tenant services; applied layered architecture and compound component
  patterns on the frontend for maintainable, scalable code.

SELECTED PROJECTS
AM Arena — Esports streaming & tournaments platform (solo, end to end)
  React Native/Expo, Node.js, PostgreSQL, Azure CI/CD. Auto-created tournament channels, chat,
  friends, reels, public & tournament voting, titles, notifications, admin dashboard.
  Extensible schema: new games added with zero impact on existing data.
SaaS Institute Platform — Multi-tenant institute management (in progress)
Ya Suria — B2B real-estate app (backend), live on Google Play
MyCar — Car sales & rental platform (backend from scratch)

EDUCATION
Informatics Engineering — Syrian Virtual University (SVU)                [status/year]

CERTIFICATIONS
IBM Back-End Development — Coursera
Meta Front-End Developer (React) — Coursera

LANGUAGES
Arabic (Native) · English ([level])
```

---

## 9. معلومات ناقصة ❓ (لازم نكملها)

- [ ] الإيميل والهاتف للتواصل (للـ CV)
- [ ] حالة الدراسة: متخرج ولا لسا؟ سنة التخرج؟
- [ ] المدينة
- [ ] مستوى الإنجليزي
- [ ] تواريخ ISS Group و ITM (للـ CV بس)
- [ ] Framework الباك: Express ولا NestJS؟ ومكتبة الـ real-time؟
- [ ] رابط korrasat.ai + دورك فيه
- [ ] دورك بـ ITM Core
- [ ] Screenshots: معاهد ISS، Markaz (تطبيق + داشبورد)، AM Arena، Ya Suria، MyCar
- [ ] فيديو/GIF قصير لـ AM Arena و Markaz
- [ ] روابط شهادات Coursera
- [ ] صورة شخصية (اختياري)
- [ ] الجمهور الأساسي: توظيف ولا عملاء ولا الاتنين؟
- [ ] اللغة: عربي / إنجليزي / الاتنين
- [x] قرار نشر كود Markaz → Private + Architecture repo
- [x] قرار سنوات الخبرة → 5+
- [x] الصورة الشخصية → `file/Cinematic Urban Portrait in Burgundy Tie (1).png`
- [ ] مواقع بورتفوليو عاجبتك كمرجع

---

## 10. خارطة الطريق

1. ✅ جمع المعلومات وكتابة هاد الدليل
2. ⬜ تكميل المعلومات الناقصة (القسم 9)
3. ⬜ تحديد الهوية البصرية: الإحساس، الألوان، الخطوط، الـ motion، الفكرة الأساسية
4. ⬜ كتابة النصوص النهائية (Copywriting) لكل قسم
5. ⬜ اختيار الـ Stack للبورتفوليو (Next.js + Framer Motion + Three.js؟)
6. ⬜ تصميم وبناء — قسم قسم (بـ session جديدة فيها `frontend-design`)
7. ⬜ SEO، أداء، Accessibility، Responsive
8. ⬜ Deploy على `ayhamashram.me`
9. ⬜ الـ CV النهائي (PDF) متناسق مع هوية البورتفوليو
10. ⬜ تحديث LinkedIn و GitHub profile README بنفس الرسالة
