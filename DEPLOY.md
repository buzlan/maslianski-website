# Инструкция по деплою на GitHub Pages

## Шаги для публикации сайта:

### 1. Создайте репозиторий на GitHub
   - Зайдите на github.com
   - Создайте новый репозиторий (например, `maslyansky-website`)
   - **Важно:** Запомните точное название репозитория!

### 2. Включите GitHub Pages в настройках репозитория
   - Зайдите в Settings → Pages
   - Source: выберите "GitHub Actions"
   - Сохраните настройки

### 3. Если название репозитория отличается от `maslyansky-website`
   - Откройте `vite.config.ts`
   - Измените строку с `base` на ваше название:
   ```ts
   base: process.env.GITHUB_PAGES === 'true' ? '/ваше-название-репозитория/' : '/',
   ```

### 4. Закоммитьте и запушьте код
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git branch -M main
   git remote add origin https://github.com/ваш-username/название-репозитория.git
   git push -u origin main
   ```

### 5. Дождитесь завершения деплоя
   - Зайдите во вкладку "Actions" в вашем репозитории
   - Дождитесь успешного завершения workflow "Deploy to GitHub Pages"
   - Сайт будет доступен по адресу: `https://ваш-username.github.io/название-репозитория/`

## Что происходит автоматически:

- При каждом push в ветку `main` автоматически запускается сборка и деплой
- Сайт обновляется автоматически в течение 1-2 минут после каждого push

## Превью для Pull Request

Каждый PR получает отдельную ссылку на тестовый сайт с изменениями из этой ветки. Боевой `maslianski.by` при этом не меняется.

Разовая настройка (бесплатный аккаунт Cloudflare):

1. Зарегистрируйтесь на [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Скопируйте **Account ID** справа на главной дашборда
3. Создайте API token: [Create Token](https://dash.cloudflare.com/profile/api-tokens) → шаблон **Edit Cloudflare Pages**
4. В GitHub: **Settings → Secrets and variables → Actions** добавьте:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

После этого в каждом новом PR появится комментарий со ссылкой вида `https://pr-12.maslianski-website-preview.pages.dev`. Её можно открыть с телефона.

## Переменные окружения

Если вам нужно настроить переменные окружения (например, для EmailJS), используйте GitHub Secrets:
- Settings → Secrets and variables → Actions → New repository secret
- Добавьте переменные: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_DOCTOR_TEMPLATE_ID`, `VITE_EMAILJS_PATIENT_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_NOTIFICATION_EMAIL`, `VITE_INSTAGRAM_URL`, `VITE_TELEGRAM_URL`
- Затем обновите workflow файл, чтобы использовать эти секреты

