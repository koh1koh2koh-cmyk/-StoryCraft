// إدارة كود منصة حكاية - التفاعل وتخزين البيانات

document.addEventListener("DOMContentLoaded", () => {
    const storyForm = document.getElementById("storyForm");
    const storiesContainer = document.getElementById("stories-container");

    // مصفوفة القصص الأولية المخزنة
    let stories = JSON.parse(localStorage.getItem("hikaya_stories")) || [
        {
            title: "رحلة غارلون - الجزء الأول",
            author: "الكاتب",
            category: "أكشن وغموض",
            content: "في غابة مظلمة كان هناك صوت رفرفة الأشجار الهادئة وأصوات الرياح، ظهر نمر يركض خلف رجل غريب، وكانت صوت خطوات الرجل هادئة ومخفية مثل القتلة المستأجرين. تسلق الرجل الشجرة فلاحظه النمر، لكن الرجل لم يتوتر بل انقض عليه بسيفه وقتله، وأكمل الرجل طريقه.\n\nفي اليوم الثاني جاء رجلان من قرية قريبة من تلك الغابة، وكانوا يريدون جمع فطر عش الغراب، فجاء رجل القرية ورأى منظر جثة النمر فصُدم ونادى على زميله فقال له وهو فرح ومبتسم: 'هذا رائع! يمكننا بيعه في القرية'..."
        }
    ];

    // دالة لعرض جميع القصص على الشاشة
    function renderStories() {
        storiesContainer.innerHTML = "";

        stories.forEach((story) => {
            const article = document.createElement("article");
            article.className = "story-card";

            article.innerHTML = `
                <h3>${escapeHtml(story.title)}</h3>
                <div class="meta-info">
                    <span class="meta-tag">${escapeHtml(story.category)}</span>
                    <span>بواسطة: ${escapeHtml(story.author)}</span>
                </div>
                <p>${escapeHtml(story.content)}</p>
            `;

            storiesContainer.appendChild(article);
        });
    }

    // إضافة قصة جديدة من النموذج
    storyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("storyTitle").value.trim();
        const author = document.getElementById("authorName").value.trim();
        const category = document.getElementById("storyCategory").value;
        const content = document.getElementById("storyContent").value.trim();

        if (title && author && content) {
            const newStory = { title, author, category, content };

            // إضافة القصة في بداية القائمة
            stories.unshift(newStory);
            
            // الحفظ في المحلي (LocalStorage)
            localStorage.setItem("hikaya_stories", JSON.stringify(stories));

            // إعادة عرض البيانات وإعادة ضبط النموذج
            renderStories();
            storyForm.reset();

            alert("تم نشر قصتك بنجاح على منصة حكاية!");
        }
    });

    // دالة لحماية النصوص من الحاقن (XSS Protection)
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // التهيئة الأولى
    renderStories();
});