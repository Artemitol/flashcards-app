import type { CardModel } from "../model/domain"

export const QuestionCardsConfig: CardModel[] = [
    // HTML
    {
        id: 1,
        group: { id: 1, name: "HTML" },
        question: "Для чего нужен HTML?",
        answer: "",
    },
    {
        id: 2,
        group: { id: 1, name: "HTML" },
        question: "Что такое семантика? DOM?",
        answer: "",
    },
    {
        id: 3,
        group: { id: 1, name: "HTML" },
        question:
            "Что такое доступность (accessibility), как она достигается, для кого делается?",
        answer: "",
    },
    {
        id: 4,
        group: { id: 1, name: "HTML" },
        question:
            "Что такое SEO (Search Engine Optimization), как оно достигается, для чего нужно?",
        answer: "",
    },
    // CSS
    {
        id: 5,
        group: { id: 2, name: "CSS" },
        question:
            "С помощью каких селекторов можно стилизовать HTML-элементы, какой у них вес?",
        answer: "",
    },
    {
        id: 6,
        group: { id: 2, name: "CSS" },
        question:
            "Какие псеводклассы, псевдоэлементы, псевдоселекторы существуют?",
        answer: "",
    },
    {
        id: 7,
        group: { id: 2, name: "CSS" },
        question: "Что такое css-reset и normalize, для чего нужны?",
        answer: "",
    },
    {
        id: 8,
        group: { id: 2, name: "CSS" },
        question:
            "Как применять стили на все браузеры, если где-то они недоступны?",
        answer: "",
    },
    {
        id: 9,
        group: { id: 2, name: "CSS" },
        question: "Какие вещи предоставляет scss. Как они работают?",
        answer: "",
    },
    // Browser
    {
        id: 10,
        group: { id: 3, name: "Browser" },
        question:
            "Что такое Event Loop, какие есть виды задач, как можно заблокировать рендеринг страницы, примеры микро и макроасок?",
        answer: "",
    },
    {
        id: 11,
        group: { id: 3, name: "Browser" },
        question:
            "Какие есть фазы рендеринга? Почему анимация, реализованная с помощью top/left хуже анимации на transform?",
        answer: "",
    },
    {
        id: 12,
        group: { id: 3, name: "Browser" },
        question:
            "Что происходит от момента ввода url в адресную строку до получения данных на странице?",
        answer: "",
    },
    // Network
    {
        id: 13,
        group: { id: 4, name: "Network" },
        question:
            "Из чего состоит HTTP запрос: Типы запросов, Статусы, Body, Headers?",
        answer: "",
    },
    {
        id: 14,
        group: { id: 4, name: "Network" },
        question: "Разница HTTP vs HTTPS?",
        answer: "",
    },
    {
        id: 15,
        group: { id: 4, name: "Network" },
        question: "Разница v1, v2, v3?",
        answer: "",
    },
    {
        id: 16,
        group: { id: 4, name: "Network" },
        question:
            "Что такое WebSocket? В чем отличие от HTTP, когда использовать?",
        answer: "",
    },
    {
        id: 17,
        group: { id: 4, name: "Network" },
        question:
            "Что такое SSE (Server Side Events)? В чем отличие от HTTP, когда использовать?",
        answer: "",
    },
    // Storage
    {
        id: 18,
        group: { id: 5, name: "Storage" },
        question: "Cookies?",
        answer: "",
    },
    {
        id: 19,
        group: { id: 5, name: "Storage" },
        question: "LocalStorage?",
        answer: "",
    },
    {
        id: 20,
        group: { id: 5, name: "Storage" },
        question: "IndexedDB?",
        answer: "",
    },
    {
        id: 21,
        group: { id: 5, name: "Storage" },
        question: "Session Storage?",
        answer: "",
    },
    // JavaScript
    {
        id: 22,
        group: { id: 6, name: "JavaScript" },
        question: "Разница объявления переменных с помощью var/let/const?",
        answer: "",
    },
    {
        id: 23,
        group: { id: 6, name: "JavaScript" },
        question:
            "Что такое всплытие и погружение события? Какие есть стадии? Как можно отслеживать?",
        answer: "",
    },
    {
        id: 24,
        group: { id: 6, name: "JavaScript" },
        question: "Какие функции всплывают?",
        answer: "",
    },
    {
        id: 25,
        group: { id: 6, name: "JavaScript" },
        question:
            "Что такое proto и prototype? Как устроено наследование в JS?",
        answer: "",
    },
    {
        id: 26,
        group: { id: 6, name: "JavaScript" },
        question:
            "Что такое контекст? Как его потерять и как привязать с помощью bind, call, apply? Объяснить разницу методов?",
        answer: "",
    },
    {
        id: 27,
        group: { id: 6, name: "JavaScript" },
        question:
            "Какие типы данных есть в JavaScript? Примитивные и ссылочные типы данных?",
        answer: "",
    },
    {
        id: 28,
        group: { id: 6, name: "JavaScript" },
        question:
            "Как копировать объект поверхностно и глубоко (spread, object.assign, structuredClone, JSON)?",
        answer: "",
    },
    {
        id: 29,
        group: { id: 6, name: "JavaScript" },
        question:
            "Статические методы класса Promise для параллельного запуска нескольких операций?",
        answer: "",
    },
    {
        id: 30,
        group: { id: 6, name: "JavaScript" },
        question: "Как работает сборщик мусора?",
        answer: "",
    },
    {
        id: 31,
        group: { id: 6, name: "JavaScript" },
        question:
            "Как работает тег <script> в HTML? Как работают атрибуты async, defer?",
        answer: "",
    },
    {
        id: 32,
        group: { id: 6, name: "JavaScript" },
        question: "Для чего предназначен Babel?",
        answer: "",
    },
    {
        id: 33,
        group: { id: 6, name: "JavaScript" },
        question: "Какие уязвимости есть в Web?",
        answer: "",
    },
    {
        id: 34,
        group: { id: 6, name: "JavaScript" },
        question: "SOLID с примерами из Frontend’а?",
        answer: "",
    },
    {
        id: 35,
        group: { id: 6, name: "JavaScript" },
        question:
            "Какие способы оптимизации фронтенда существуют без привязки к фреймворку?",
        answer: "",
    },
    // TypeScript
    {
        id: 36,
        group: { id: 7, name: "TypeScript" },
        question: "В чем минус использования TypeScript?",
        answer: "",
    },
    {
        id: 37,
        group: { id: 7, name: "TypeScript" },
        question: "Разница типов и интерфейсов?",
        answer: "",
    },
    {
        id: 38,
        group: { id: 7, name: "TypeScript" },
        question: "Что такое дженерик?",
        answer: "",
    },
    {
        id: 39,
        group: { id: 7, name: "TypeScript" },
        question: "Что такое декларейшен?",
        answer: "",
    },
    {
        id: 40,
        group: { id: 7, name: "TypeScript" },
        question: "Что такое infer и conditional types?",
        answer: "",
    },
    {
        id: 41,
        group: { id: 7, name: "TypeScript" },
        question: "Какие утилити тайпы ты знаешь?",
        answer: "",
    },
    {
        id: 42,
        group: { id: 7, name: "TypeScript" },
        question: "never vs any vs unknown?",
        answer: "",
    },
    // React
    {
        id: 43,
        group: { id: 8, name: "React" },
        question:
            "Как работает React? (Virtual DOM, Reconcilation, Fiber, что тригерит перерендер, как происходит сравнение props’ов)?",
        answer: "",
    },
    {
        id: 44,
        group: { id: 8, name: "React" },
        question:
            "Методы жизненного цикла классового компонента. Аналоги в функциональном?",
        answer: "",
    },
    {
        id: 45,
        group: { id: 8, name: "React" },
        question:
            "Для чего нужны react hooks? Какие хуки существуют включая 19 версию React? В чем разница хуков useEffect vs useLayoutEffect?",
        answer: "",
    },
    {
        id: 46,
        group: { id: 8, name: "React" },
        question: "Для чего нужен React.Context?",
        answer: "",
    },
    {
        id: 47,
        group: { id: 8, name: "React" },
        question: "Для чего нужен Redux? В чем суть Flux архитектуры?",
        answer: "",
    },
    {
        id: 48,
        group: { id: 8, name: "React" },
        question: "Какие еще знаешь state-manager'ы? В чем отличие от Redux?",
        answer: "",
    },
    {
        id: 49,
        group: { id: 8, name: "React" },
        question: "Способы оптимизации React-компонентов?",
        answer: "",
    },
    {
        id: 50,
        group: { id: 8, name: "React" },
        question: "Как бы ты организовал архитектуру фронтенд приложения?",
        answer: "",
    },
    {
        id: 51,
        group: { id: 8, name: "React" },
        question: "Преимущества Next над React? Какую проблему он решает?",
        answer: "",
    },
]
