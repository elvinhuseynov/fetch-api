// fetchPosts funksiyası asinxron əməliyyatlar apararaq postları API-dən çəkmək üçündür.
async function fetchPosts() {
  try {
    // 1. HTTP sorğusu göndəririk:
    // "fetch" metodu ilə "https://jsonplaceholder.typicode.com/posts" URL-ə sorğu göndəririk.
    // await istifadə edərək, sorğunun tamamlanmasını gözləyirik və nəticəni "response" dəyişəninə mənimsəyirik.
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    // 2. Sorğunun uğurlu olub olmadığını yoxlayırıq:
    // response.ok dəyəri, HTTP status kodunun 200-299 aralığında olduğunu bildirir.
    // Əgər sorğu uğursuzdursa, məsələn, 404 (tapılmadı) və ya 500 (server xətası) kimi status kodları alınıbsa, xəta atılır.
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    // 3. Cavabın JSON formatına çevrilməsi:
    // API-dən gələn cavab mətni JSON formatındadır. await ilə bu çevirmə əməliyyatını tamamlayırıq.
    const data = await response.json();

    // 4. Alınan JSON məlumatı geri qaytarılır.
    return data;
  } catch (error) {
    // Əgər yuxarıdakı proseslər zamanı hər hansı bir xəta baş verərsə, bu blok işə düşür.
    // Konsola xəta mesajı və xətanın detallarını yazırıq ki, tərtibat zamanı problem asanlıqla tapılsın.
    console.error("Error fetching posts:", error);
    // Xəta halında funksiyadan boş bir array qaytarırıq. Bu, proqramın davamlı işləməsinə imkan yaradır.
    return [];
  }
}

// renderPosts funksiyası, fetchPosts funksiyası ilə alınan post məlumatlarını DOM-a əlavə etmək üçündür.
function renderPosts(posts) {
  // 1. DOM-dan postların yerləşdiriləcəyi konteyneri tapırıq:
  // "document.getElementById" metodu ilə HTML sənədində "posts-container" id-si olan elementi seçirik.
  const postsContainer = document.getElementById("posts-container");

  // 2. Əgər "posts-container" tapılmazsa, funksiyanı dayandırırıq:
  // Bu, potensial səhvlərin qarşısını almaq və səhifənin düzgün işləməsini təmin etmək üçündür.
  if (!postsContainer) return;

  // 3. Mövcud məzmunu təmizləyirik:
  // postsContainer-in innerHTML dəyərini boş string-ə təyin edərək, əvvəllər əlavə olunmuş postları silirik.
  postsContainer.innerHTML = "";

  // 4. Alınan postlar array-ı üzərində döngü qururuq:
  // Hər bir post üçün, ayrı-ayrı kart elementi yaradılıb konteynerə əlavə ediləcək.
  posts.forEach((post) => {
    // 4.1. Yeni div elementi yaradırıq:
    // Bu div elementi hər bir postu vizual olaraq göstərmək üçün kart kimi istifadə olunacaq.
    const postDiv = document.createElement("div");

    // 4.2. Tailwind CSS sinifləri əlavə edirik:
    // - "bg-white": Ağ arxa fon verir.
    // - "rounded": Yumşaq künclər təmin edir.
    // - "shadow": Kart elementinə kölgə effekti verir.
    // - "p-4": Kartın içərisinə 4 vahidlik daxili boşluq əlavə edir.
    // - "flex flex-col": Flexbox layout istifadə edərək elementləri sütun şəklində düzür.
    // - "justify-between": Elementlər arasında bərabər boşluq yaradır.
    postDiv.className =
      "bg-white rounded shadow p-4 flex flex-col justify-between";

    // 4.3. Kartın içərisinə HTML məzmunu əlavə edirik:
    // Şablon iplərindən (template literals) istifadə edərək, postun başlığı, mətni və istifadəçi ID-sini dinamik şəkildə daxil edirik.
    postDiv.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
        <p class="text-gray-700 mb-4">${post.body}</p>
        <span class="text-sm text-gray-500">User ID: ${post.userId}</span>
      `;
    // Burada:
    // - <h2> etiketi postun başlığını göstərir və ona böyük, qalın və alt boşluğu olan stil tətbiq olunur.
    // - <p> etiketi postun mətni üçün nəzərdə tutulub, orta ölçülü və boz rəngli mətni göstərir.
    // - <span> etiketi postu əlavə edən istifadəçinin ID-sini göstərir.

    // 4.4. Yaradılmış kartı postsContainer elementinə əlavə edirik:
    // Bu addım, hər bir post kartının HTML sənədində görünməsini təmin edir.
    postsContainer.appendChild(postDiv);
  });
}

// DOMContentLoaded hadisəsi, HTML sənədinin tam yükləndiyini və bütün elementlərin mövcud olduğunu göstərir.
// Bu hadisə baş verdikdən sonra, postların çəkilməsi və render edilməsi üçün lazımi funksiyalar çağırılır.
document.addEventListener("DOMContentLoaded", async () => {
  // 1. fetchPosts funksiyasını çağıraraq post məlumatlarını asinxron şəkildə alırıq:
  // await istifadə edərək postların tamamilə yüklənməsini gözləyirik.
  const posts = await fetchPosts();

  // 2. Alınan post məlumatlarını renderPosts funksiyası vasitəsilə DOM-da göstəririk:
  // Bu addım, istifadəçi interfeysində postların kart şəklində təqdim olunmasını təmin edir.
  renderPosts(posts);
});
