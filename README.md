# 🚀 Upwork Portfolio & Proposals Repository

Структурированная коллекция предложений, проектов и системы артефактов для работы на Upwork.

## 📁 Структура проекта

### `upwork-proposals/` - Предложения по датам
```
upwork-proposals/
└── 2025/
    └── august/
        ├── 2025-08-01_ecotech/     # 24 файла - EcoTech и другие
        ├── 2025-08-02_mixed/       # 14 файлов - смешанные проекты  
        ├── 2025-08-06_various/     # 8 файлов - разные предложения
        └── 2025-08-13_dental/      # 8 файлов - стоматология и др.
```

### `real-projects/` - Реальные клиентские проекты
```
real-projects/
├── bill-cspark/            # Проект для Bill CSpark
├── tara/                   # Проект для Tara
├── dubai-agency/           # Агентство в Дубае
├── personal-site/          # Личная страница (index.html, aboutleo.html)
└── aftercalls/             # Материалы после звонков
```

### `artifacts-system/` - Система компонентов
```
artifacts-system/
├── css/                    # Все стили
│   ├── artifacts.css       # Компоненты UI
│   ├── artifacts2.css      # Дополнительные стили
│   ├── layout.css          # Система макетов
│   └── styles.css          # Основные стили
├── js/
│   └── premium.js          # JavaScript функции
├── docs/                   # Документация
│   ├── artifacts-guide.md  # Руководство по артефактам
│   ├── layout.md          # Документация макетов
│   └── STYLEGUIDE.md      # Гайд по стилям
└── examples/              # Примеры использования
    ├── artifacts.html     # Демо артефактов
    └── test.html         # Тестовый файл
```

## 🗓️ Система именования для новых предложений

**Формат:** `YYYY-MM-DD_название-проекта/`

**Примеры:**
- `2025-01-15_healthcare-automation/`
- `2025-01-20_ecommerce-dashboard/`
- `2025-02-01_ai-chatbot-integration/`

## 🎯 Как использовать

1. **Новое предложение:** Создай папку `upwork-proposals/2025/month/YYYY-MM-DD_project-name/`
2. **Реальный проект:** Добавь в `real-projects/client-name/`
3. **Компоненты:** Используй файлы из `artifacts-system/`

## 🛠️ Быстрый старт

```bash
# Скопировать систему артефактов для нового проекта
cp -r artifacts-system/css/ new-project/
cp artifacts-system/docs/artifacts-guide.md new-project/

# Создать новое предложение
mkdir -p upwork-proposals/2025/january/2025-01-15_project-name/
```

---
*Обновлено: Январь 2025 | Структура оптимизирована для 2025 года*