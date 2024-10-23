const translations = {
  uz: {
    common: {
      login: "Kirish",
      signup: "Ro'yxatdan o'tish",
      profile: "Profil",
      logout: "Chiqish",
      privacy_policy: "Maxfiylik siyosati",
      first_name: "Ism",
      last_name: "Familiya",
      pinfl: "JSHSHIR",
      phone_number: "Telefon raqami",
      loading: "Yuklanmoqda",
      try_again: "Qayta urinib ko'ring",
      forgot_password: "Parolni unutdingizmi?",
      submit: "Yuborish",
      continue: "Davom etish",
      events: "Tadbirlar",
      coursera: "coursera",
      learn_more: "Batafsil ma'lumot",
      about_us: "Biz haqimizda",
      membership: "A'zolik",
      for_partners: "Hamkorlar uchun",
      certification: "Sertifikatlash",
      rating: "Reyting",
      join: "Qo'shilish",
      team: "Jamoa",
      leadership: "Liderlik",
      structure: "Struktura",
      career: "Karyera",
      most_popular: "Eng mashhur",
      month: "oy",
      get_started: "Boshlash",
      contact_us: "Biz bilan bog'laning",
      total: "Jami",
      cancel: "Bekor qilish",
      send_message: "Xabar yuborish",
      national_partners: "Mahalliy hamkorlar",
      global_partners: "Global hamkorlar",
      view_more: "Ko'proq ko'rish",
      read_more: "Batafsil o'qish",
      read_less: "Kamroq o'qish",
      name: "Nomi",
      previous: "Oldingi",
      next: "Keyingi",
      no_results: "Natijalar yo'q",
      email: "Email",
      address: "Manzil",
      search: "Qidirish",
      subjects: "Mavzular",
      filter_by: "Filtrlash",
      content_type: "Kontent turi",
      levels: "Darajalar",
      skills: "Bilimlar",
      show_more: "Ko'proq ko'rsatish",
      show_less: "Kamroq ko'rsatish",
      view_course: "Kursni ko'rish",
      explore: "Ochish",
      your_plan: "Sizning tarif",
      footer: {
        copyright_text:
          "IT Ta'lim Assotsiatsiyasi. Barcha huquqlar himoyalangan",
        terms_of_use: "Foydalanish shartlari",
      },
    },
    profile: {
      change_email: "Emailni o'zgartirish",
      update: "Ma'lumotlatlar yangilandi",
      update_pass: "Parol muvaffaqiyatli yangilandi",
      sent_email: "We have sent a message to your email.",
      change_pass: "Parolni o'zgartirish",
      change_info: "Ma'lumotlarni o'zgartirish",
      date_of: "Ro'yxatdan o'tgan sana:",
      new_pass: "Yangi parol",
      current_pass: "Joriy parol",
      confirm_pass: "Parolni tasdiqlang",
      completed_courses: "Tugatilgan kurslar",
      same_email:
        "O'zgartirilayotgan elektron pochta manzili profil elektron pochtasi bilan bir xil bo'lmasligi mumkin",
      log_out:
        "Taymerdan so'ng siz tizimdan chiqasiz va yana tizimga kirishingiz kerak bo'ladi",
      no_tariff: "Sizda tarif yo'q",
      ongoing_courses: "Davom etayotgan kurslar",
    },
    signup: {
      title: "Ro'yxatdan o'tish",
      description: "IT Ta’lim Uyushmasiga xush kelibsiz - ro'yxatdan o'tish",
      login_text: "Akkauntingiz bormi?",
      form: {
        first_name: {
          placeholder: "Ism",
          error_msg: "Ism kamida 3 ta belgidan iborat bo'lishi kerak",
        },
        last_name: {
          placeholder: "Familiya",
          error_msg: "Familiya kamida 3 ta belgidan iborat bo'lishi kerak",
        },
        pinfl: {
          help_text:
            "JSHSHIR – bu jismoniy shaxsning shaxsiy identifikatsiya raqamidir. JSHSHIR – pasport yoki ID-kartada ko'rsatilgan bo'ladi.",
          placeholder: "JSHSHIR",
          error_msg: "JSHSHIR 14 ta belgidan iborat bo'lishi kerak",
        },

        email: {
          placeholder: "Email",
          error_msg: "Email haqiqiy bo'lishi kerak",
        },
        phone_number: {
          placeholder: "Telefon raqami",
          error_msg: "Telefon raqamini to'ldirish majburiy",
        },
        password: {
          placeholder: "Parol",
          error_msg: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
        },
        passwordConfirm: {
          placeholder: "Parolni tasdiqlang",
          error_msg: "Tasdiqlash paroli parol bilan mos kelishi kerak",
        },
      },
      check_email: {
        title: "Emailingizni tekshiring",
        description: (email) =>
          `<b>${email}</b> manziliga tasdiqlash uchun xabar yubordik`,
        try_text: "Xabar kelmadimi?",
      },
    },
    login: {
      description: "Xush kelibsiz! Iltimos, ma'lumotlarni kiriting",
      signup_text: "Akkauntingiz yo'qmi?",
      form: {
        identifier: {
          placeholder: "Email",
          error_msg: "Email haqiqiy bo'lishi kerak",
        },
        password: {
          placeholder: "Parol",
          error_msg: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
        },
      },
      coursera_form: {
        title: 'Siz "Coursera"ga yo\'naltirilyapsiz',
      },
    },
    reset_password: {
      enter_email: {
        description:
          "Xavotir olmang, biz sizga parolni yangilash bo'yicha ko'rsatmalar yuboramiz",
        form: {
          email: {
            label: "Email",
            placeholder: "Emailni kiriting",
            error_msg: "Email haqiqiy bo'lishi kerak",
          },
        },
      },
      check_email: {
        title: "Emailingizni tekshiring",
        description: (email) =>
          `<b>${email}</b> manziliga parolni tiklash havolasini yubordik`,
        try_text: "Xabar kelmadimi?",
      },
      new_password: {
        title: "Yangi parol o'rnatish",
        description: "Yangi parolingiz oldingi paroldan farq qilishi kerak",
        form: {
          password: {
            label: "Parol",
            placeholder: "Yangi parolni kiriting",
            error_msg: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
          },
          button_text: "Parolni yangilash",
        },
      },
      success: {
        title: "Parol yangilandi",
        description:
          "Parolingiz muvaffaqiyatli yangilandi. Kirish uchun pastdagi tugmani bosing",
      },
    },
    home: {
      title: "Salom",
    },
    events: {
      dates: {
        suptitle: "Yangi tadbirlar",
        title: "Kelgusi",
        description:
          "PAGE ga xush kelibsiz. IT-taʼlim uyushmasi Oʻzbekistonda taʼlim loyihalarini rivojlantirishga qaratilgan anglashuv memorandumini imzoladi. Imzolash marosimi ICTWEEK UZBEKISTAN 2023 AKT haftaligi doirasida IT-ta’lim forumi doirasida bo‘lib o‘tdi.",
      },
    },
    courses: {
      markup: "20% markup",
      bonus: "50% bonus",
    },
    membership: {
      payment_dialog: {
        title: (planName) => `${planName} tarifini sotib olish`,
        subtitle: "Qaysi oylik rejani sotib olishni tanlang.",
        description: (text) => `${text}lik tarifini sotib olmoqchimisiz?`,
        terms_text: (href) => `Men <a href="${href}">shartlarga</a> roziman`,
      },
      payment_success_dialog: {
        title: "To'lov amalga oshirildi",
        description: (planName) =>
          `Siz ${planName} tarifini 1 oyga sotib oldingiz`,
      },
      payment_failure_dialog: {
        title: "Nimadir noto'g'ri ketdi",
        description: "Iltimos, qayta urinib ko'ring",
      },
    },
    contact_us: {
      description: "Lorem ipsum dolor sit amet consectetur. Lectus est.",
      form: {
        full_name: {
          label: "To'liq ism",
          placeholder: "Eshmatov Toshmat",
          error_msg: "To'liq ism kamida 3 ta belgidan iborat bo'lishi kerak",
        },
        email: {
          label: "Email",
          placeholder: "example@mail.com",
          error_msg: "Email haqiqiy bo'lishi kerak",
        },
        phone_number: {
          label: "Telefon raqami",
          placeholder: "+998 (90) 000-0000",
          error_msg: "Telefon raqamini to'ldirish majburiy",
        },
        message: {
          label: "Xabar",
          placeholder: "Bizga xabar qoldiring...",
        },
      },
      success_text: "Sizning xabaringiz muvaffaqiyatli yuborildi.",
    },
    coursera_filters: {
      results_count: (count = 0, filters = "") =>
        `${filters ? `"${filters}" uchun` : ""} ${count} ta natija`,
    },
    email_confirmation: {
      failed_text: "Elektron pochtani tasdiqlashda xatolik yuz berdi",
      not_found_text: "URL parametrlarida tasdiqlash kodi topilmadi",
    },
    coursera_home: {
      pricing: {
        title: "Kurslarga obuna",
        plan_price: (price) => `${price} so'm`,
        instructions_text: "Kursga kirish bo'yicha ko'rsatmalar",
      },
      bonus_amount: (amount) => `${amount} bonus`,
      payment_title: "To'lov amalga oshirildi, emailingizni tekshiring",
    },
    logo: {
      isLogo: 'uz',
    } 
  

  },
  ru: {
    common: {
      login: "Войти",
      signup: "Зарегистрироваться",
      privacy_policy: "Политика конфиденциальности",
      profile: "Профиль",
      logout: "Выйти",
      first_name: "Имя",
      last_name: "Фамилия",
      pinfl: "ПИНФЛ",
      loading: "Загрузка",
      try_again: "Попробуйте ещё раз",
      forgot_password: "Забыли пароль?",
      submit: "Отправить",
      continue: "Продолжить",
      events: "Мероприятия",
      learn_more: "Узнать больше",
      about_us: "О нас",
      coursera: "coursera",
      membership: "Членство",
      for_partners: "Для партнеров",
      certification: "Сертификация",
      rating: "Рейтинг",
      join: "Присоединиться",
      team: "Команда",
      leadership: "Лидерство",
      structure: "Структура",
      career: "Карьера",
      most_popular: "Самый популярный",
      month: "месяц",
      get_started: "Начать",
      contact_us: "Свяжитесь с нами",
      total: "Итого",
      cancel: "Отменить",
      send_message: "Отправить сообщение",
      national_partners: "Национальные партнеры",
      global_partners: "Глобальные партнеры",
      view_more: "Показать больше",
      read_more: "Читать дальше",
      read_less: "Читать меньше",
      name: "Название",
      previous: "Предыдущий",
      next: "Далее",
      no_results: "Нет результатов",
      email: "Электронная почта",
      address: "Адрес",
      search: "Поиск",
      subjects: "Темы",
      filter_by: "Фильтровать по",
      content_type: "Тип контента",
      levels: "Уровни",
      skills: "Навыки",
      show_more: "Показать больше",
      show_less: "Показать меньше",
      view_course: "Просмотреть курс",
      explore: "Исследовать",
      your_plan: "Ваш план",
      footer: {
        copyright_text: "Ассоциация ИТ-образования. Все права защищены",
        terms_of_use: "Условия эксплуатации",
      },
      phone_number: "Номер телефона",
    },
    profile: {
      change_email: "Изменить адрес электронной почты",
      update: "Данные обновлены",
      update_pass: "Пароль успешно обновлен",
      send_email: "Мы отправили сообщение на ваш адрес электронной почты.",
      change_pass: "Изменить пароль",
      change_info: "Изменить информацию",
      date_of: "Дата регистрации:",
      ongoing_courses: "Текущие курсы",
      same_email:
        "Изменяемый адрес электронной почты может не совпадать с адресом электронной почты профиля",
      log_out:
        "По истечении таймера вы выйдете из системы и вам нужно будет войти снова",
      new_pass: "Новый пароль",
      current_pass: "Текущий пароль",
      confirm_pass: "Подтвердите пароль",
      no_tariff: "У вас нет тарифа",
      completed_courses: "Завершенные курсы",
    },
    courses: {
      markup: "20% markup",
      bonus: "50% bonus",
    },
    signup: {
      title: "Зарегистрироваться",
      description:
        "Добро пожаловать в Ассоциация ИТ-образования - создайте свою учетную запись",
      login_text: "У вас уже есть аккаунт?",
      form: {
        first_name: {
          placeholder: "Имя",
          error_msg: "Имя должно содержать не менее 3 символов",
        },
        last_name: {
          placeholder: "Фамилия",
          error_msg: "Фамилия должна содержать не менее 3 символов",
        },
        pinfl: {
          help_text:
            "ПИНФЛ – персональный идентификационный номер физического лица. ПИНФЛ – будет указан в паспорте или удостоверении личности.",
          placeholder: "ПИНФЛ",
          error_msg: "ПИНФЛ должен состоять из 14 символов",
        },
        email: {
          placeholder: "Электронная почта",
          error_msg: "Электронная почта должна быть действительной",
        },
        phone_number: {
          placeholder: "Номер телефона",
          error_msg: "Заполнение номер телефона обязательно",
        },
        password: {
          placeholder: "Пароль",
          error_msg: "Пароль должен быть не менее 6 символов",
        },
        passwordConfirm: {
          placeholder: "Подтвердите пароль",
          error_msg: "Подтверждение пароля должно совпадать с паролем",
        },
      },
      check_email: {
        title: "Проверьте свою электронную почту",
        description: (email) =>
          `Мы отправили ссылку для подтверждения на <b>${email}</b>`,
        try_text: "Не получили письмо?",
      },
    },
    login: {
      description: "С возвращением! Пожалуйста, введите свои данные",
      signup_text: "Нет аккаунта?",
      form: {
        identifier: {
          placeholder: "Электронная почта",
          error_msg: "Электронная почта должна быть действительной",
        },
        password: {
          placeholder: "Пароль",
          error_msg: "Пароль должен быть не менее 6 символов",
        },
      },
      coursera_form: {
        title: 'Вы будете перенаправлены на "Coursera"',
      },
    },
    reset_password: {
      enter_email: {
        description: "Не беспокойтесь, мы вышлем вам инструкции по сбросу",
        form: {
          email: {
            label: "Электронная почта",
            placeholder: "Введите адрес электронной почты",
            error_msg: "Электронная почта должна быть действительной",
          },
        },
      },
      check_email: {
        title: "Проверьте свою электронную почту",
        description: (email) =>
          `Мы отправили ссылку для сброса пароля на <b>${email}</b>`,
        try_text: "Не получили письмо?",
      },
      new_password: {
        title: "Установить новый пароль",
        description: "Ваш новый пароль должен отличаться от предыдущего пароля",
        form: {
          password: {
            label: "Пароль",
            placeholder: "Введите новый пароль",
            error_msg: "Пароль должен быть не менее 6 символов",
          },
          button_text: "Сбросить пароль",
        },
      },
      success: {
        title: "Пароль обновлен",
        description:
          "Ваш пароль был успешно обновлен. Нажмите кнопку ниже, чтобы войти",
      },
    },
    home: {
      title: "Привет",
    },
    events: {
      dates: {
        suptitle: "Новые события",
        title: "Предстоящие",
        description:
          "Добро пожаловать на PAGE. Ассоциация ИТ-образования подписали меморандум о взаимопонимании, направленный на развитие образовательных проектов в Узбекистане. Церемония подписания состоялась в рамках форума IT-образования в рамках ICTWEEK UZBEKISTAN 2023.",
      },
    },
    membership: {
      payment_dialog: {
        title: (planName) => `Покупка тарифа ${planName}`,
        subtitle: "Выберите, какой ежемесячный план приобрести.",
        description: (text) => `Вы хотите купить ${text} план?`,
        terms_text: (href) => `Я согласен с <a href="${href}">условиями</a>`,
      },
      payment_success_dialog: {
        title: "Платеж произведен",
        description: (planName) =>
          `Вы приобрели тариф ${planName} на 6 месяцев`,
      },
      payment_failure_dialog: {
        title: "Что-то пошло не так",
        description: "Пожалуйста, попробуйте еще раз",
      },
    },
    contact_us: {
      description: "Lorem ipsum dolor sit amet consectetur. Lectus est.",
      form: {
        full_name: {
          label: "Полное имя",
          placeholder: "Иван Иванович",
          error_msg: "Полное имя должно содержать не менее 3 символов",
        },
        email: {
          label: "Электронная почта",
          placeholder: "example@mail.com",
          error_msg: "Электронная почта должна быть действительной",
        },
        phone_number: {
          label: "Номер телефона",
          placeholder: "+998 (90) 000-0000",
          error_msg: "Заполнение номер телефона обязательно",
        },
        message: {
          label: "Сообщение",
          placeholder: "Оставьте нам сообщение...",
        },
      },
      success_text: "Ваше сообщение успешно отправлено.",
    },
    coursera_filters: {
      results_count: (count = 0, filters = "") =>
        `${count} результатов ${filters ? `по запросу "${filters}"` : ""}`,
    },
    email_confirmation: {
      failed_text: "Не удалось подтвердить письмо",
      not_found_text: "Код подтверждения не найден в параметрах URL",
    },
    coursera_home: {
      pricing: {
        title: "Подписка на курсы",
        plan_price: (price) => `${price} сум`,
        instructions_text: "Инструкция по входу на курс",
      },
      bonus_amount: (amount) => `${amount} бонус`,
      payment_title: "Платеж произведен, проверьте свою электронную почту",
    },
    logo: {
      isLogo: 'ru',
    }
  },
  en: {
    common: {
      login: "Log in",
      signup: "Sign up",
      first_name: "First name",
      profile: "Profile",
      logout: "Log out",
      privacy_policy: "Privacy policy",
      last_name: "Last name",
      pinfl: "PINFL",
      loading: "Loading",
      try_again: "Try again",
      forgot_password: "Forgot Password?",
      submit: "Submit",
      continue: "Continue",
      events: "Events",
      learn_more: "Learn More",
      about_us: "About Us",
      coursera: "coursera",
      membership: "Membership",
      for_partners: "For Partners",
      certification: "Certification",
      rating: "Rating",
      join: "Join",
      team: "Team",
      leadership: "Leadership",
      structure: "Structure",
      career: "Career",
      most_popular: "Most popular",
      month: "month",
      get_started: "Get Started",
      contact_us: "Contact Us",
      total: "Total",
      cancel: "Cancel",
      send_message: "Send message",
      national_partners: "National Partners",
      global_partners: "Global Partners",
      view_more: "View more",
      read_more: "Read more",
      read_less: "Read less",
      name: "Name",
      previous: "Previous",
      next: "Next",
      no_results: "No results",
      email: "Email",
      address: "Address",
      search: "Search",
      subjects: "Subjects",
      filter_by: "Filter by",
      content_type: "Content type",
      levels: "Levels",
      skills: "Skills",
      show_more: "Show more",
      show_less: "Show less",
      view_course: "View course",
      explore: "Explore",
      your_plan: "Your plan",
      footer: {
        copyright_text: "IT Education Association. All right reserved",
        terms_of_use: "Terms of use",
      },
      phone_number: "Phone number",
    },
    profile: {
      change_email: "Change email",
      update: "Profile has been successfully updated",
      update_pass: "Password has been successfully updated",
      sent_email: "We have sent a message to your email.",
      change_pass: "Change password",
      change_info: "Change information",
      date_of: "Date of registration:",
      same_email:
        "The email being changed may not be the same as the profile email",
      log_out:
        "After the timer you will be logged out and you will need to log in again",
      new_pass: "New password",
      current_pass: "Current password",
      confirm_pass: "Confirm password",
      ongoing_courses: "Ongoing courses",
      completed_courses: "Completed courses",
      no_tariff: "You do not have a tariff",
    },
    courses: {
      markup: "20% markup",
      bonus: "50% bonus",
    },
    signup: {
      title: "Sign up",
      description:
        "Welcome to IT Education Association - let’s create your account",
      login_text: "Already have an account?",
      form: {
        first_name: {
          placeholder: "First name",
          error_msg: "First name must be at least 3 characters",
        },
        last_name: {
          placeholder: "Last name",
          error_msg: "Last name must be at least 3 characters",
        },
        pinfl: {
          help_text:
            "PINFL is a personal identification number of an individual. PINFL is indicated on a passport or ID card.",
          placeholder: "PINFL",
          error_msg: "PINFL must be 14 characters long",
        },
        email: {
          placeholder: "Email",
          error_msg: "Email must be a valid email address",
        },
        phone_number: {
          placeholder: "Phone number",
          error_msg: "Phone number is required",
        },
        password: {
          placeholder: "Password",
          error_msg: "Password must be at least 6 characters",
        },
        passwordConfirm: {
          placeholder: "Confirm Password",
          error_msg: "Confirm password should be match with password",
        },
      },
      check_email: {
        title: "Check your email",
        description: (email) =>
          `We sent a confirmation link to <b>${email}</b>`,
        try_text: "Didn't receive the email?",
      },
    },
    login: {
      description: "Welcome back! Please enter your details",
      signup_text: "Don't have an account?",
      form: {
        identifier: {
          placeholder: "Email",
          error_msg: "Email must be a valid email address",
        },
        password: {
          placeholder: "Password",
          error_msg: "Password must be at least 6 characters",
        },
      },
      coursera_form: {
        title: 'You are being redirected to "Coursera"',
      },
    },
    reset_password: {
      enter_email: {
        description: "No worries, we'll send you reset instructions",
        form: {
          email: {
            label: "Email",
            placeholder: "Enter your email",
            error_msg: "Email must be a valid email address",
          },
        },
      },
      check_email: {
        title: "Check your email",
        description: (email) =>
          `We sent a password reset link to <b>${email}</b>`,
        try_text: "Didn't receive the email?",
      },
      new_password: {
        title: "Set new password",
        description:
          "Your new password must be different from the previous password",
        form: {
          password: {
            label: "Password",
            placeholder: "Enter new password",
            error_msg: "Password must be at least 6 characters",
          },
          button_text: "Reset password",
        },
      },
      success: {
        title: "Password updated",
        description:
          "Your password has been successfully updated. Click the button below to login",
      },
    },
    home: {
      title: "Hello world!",
    },
    events: {
      dates: {
        suptitle: "New events",
        title: "Upcoming",
        description:
          "Welcome to PAGE. The IT Education Association signed a memorandum of understanding aimed at developing educational projects in Uzbekistan. The signing ceremony was held as part of the IT-education forum as part of ICTWEEK UZBEKISTAN 2023.",
      },
    },
    membership: {
      payment_dialog: {
        title: (planName) => `Buying a ${planName} tariff`,
        subtitle: "Choose which monthly plan to purchase.",
        description: (text) => `Want to buy ${text} plan?`,
        terms_text: (href) => `I agree with <a href="${href}">terms</a>`,
      },
      payment_success_dialog: {
        title: "Payment made",
        description: (planName) =>
          `You have purchased a ${planName} tariff for 6 months`,
      },
      payment_failure_dialog: {
        title: "Something went wrong",
        description: "Please try again",
      },
    },
    contact_us: {
      description: "Lorem ipsum dolor sit amet consectetur. Lectus est.",
      form: {
        full_name: {
          label: "Full name",
          placeholder: "John Doe",
          error_msg: "Full name must be at least 3 characters",
        },
        email: {
          label: "Email",
          placeholder: "example@mail.com",
          error_msg: "Email must be a valid email address",
        },
        phone_number: {
          label: "Phone number",
          placeholder: "+998 (90) 000-0000",
          error_msg: "Phone number is required",
        },
        message: {
          label: "Message",
          placeholder: "Leave us a message...",
        },
      },
      success_text: "Your message has been sent successfully.",
    },
    coursera_filters: {
      results_count: (count = 0, filters = "") =>
        `${count} results ${filters ? `for "${filters}"` : ""}`,
    },
    email_confirmation: {
      failed_text: "Email confirmation failed",
      not_found_text: "Confirmation code not found in URL params",
    },
    coursera_home: {
      pricing: {
        title: "Subscription to courses",
        plan_price: (price) => `${price} soums`,
        instructions_text: "Instructions for entering the course",
      },
      bonus_amount: (amount) => `${amount} bonus`,
      payment_title: "Payment made, check your email",
    },

    logo: {
      isLogo: 'en',
    }
  },
};

export default translations;
