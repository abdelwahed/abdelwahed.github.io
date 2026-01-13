function index_render(data){
    console.log('Rendering with data:', data);
    // Add loading state to data
    data.isLoaded = false;

    // Determine current page
    const path = window.location.pathname;
    let currentPage = 'index';
    if (path.endsWith('news.html')) currentPage = 'news';
    if (path.endsWith('publication.html')) currentPage = 'publication';
    if (path.endsWith('blog.html')) currentPage = 'blog';
    if (path.endsWith('fun.html')) currentPage = 'fun';
    if (path.endsWith('research.html')) currentPage = 'research';
    if (path === '/') currentPage = 'index';

    // Add blog data to header and hide news/publication
    data.header.blog = true;
    data.header.news = false;
    data.header.publication = false;

    // Add blog posts data with images
    data.blogPosts = [
        {
            title: "Introduction to Optimal Transport Theory",
            date: "March 15, 2024",
            summary: "A comprehensive introduction to optimal transport theory, its mathematical foundations, and applications in machine learning.",
            image: "images/blog/optimal-transport.jpg",
            url: "blog/optimal-transport-introduction.html",
            content: {
                mainImage: "images/blog/optimal-transport-main.jpg",
                diagrams: [
                    "images/blog/ot-diagram1.jpg",
                    "images/blog/ot-diagram2.jpg"
                ]
            }
        },
        {
            title: "Wasserstein GANs: A Deep Dive",
            date: "March 10, 2024",
            summary: "Exploring the connection between optimal transport and generative adversarial networks, with a focus on Wasserstein GANs.",
            image: "images/blog/wgan.jpg",
            url: "blog/wasserstein-gans.html",
            content: {
                mainImage: "images/blog/wgan-main.jpg",
                diagrams: [
                    "images/blog/wgan-diagram1.jpg",
                    "images/blog/wgan-diagram2.jpg"
                ]
            }
        },
        {
            title: "Optimal Transport in Natural Language Processing",
            date: "March 5, 2024",
            summary: "How optimal transport is revolutionizing natural language processing tasks, from text generation to document classification.",
            image: "images/blog/nlp.jpg",
            url: "blog/ot-nlp.html",
            content: {
                mainImage: "images/blog/nlp-main.jpg",
                diagrams: [
                    "images/blog/nlp-diagram1.jpg",
                    "images/blog/nlp-diagram2.jpg"
                ]
            }
        }
    ];

    try {
        var header = new Vue({
            el: 'header',
            data: {
                ...data.header,
                currentPage: currentPage
            },
            mounted: function () {
                this.$nextTick(function () {
                    $('#nav').slicknav({
                        'label' : '',
                        'prependTo': '.mobile-menu',
                    });
                })
            }
        });

        var index_container = new Vue({
            el: '#container',
            data: data,
            mounted: function() {
                console.log('Container mounted');
                this.isLoaded = true;
                // Force content visibility
                document.querySelector('.main-content').classList.add('loaded');
                document.querySelector('.loading-overlay').style.display = 'none';
            }
        });

        var footer = new Vue({
            el: 'footer',
            data: data
        });
    } catch (error) {
        console.error('Error in Vue initialization:', error);
        // Show error message to user
        document.querySelector('.main-content').innerHTML = '<div class="alert alert-danger">Error loading page content. Please try refreshing.</div>';
        document.querySelector('.main-content').classList.add('loaded');
        document.querySelector('.loading-overlay').style.display = 'none';
    }
}

function loadJSON(callback) {
    console.log('Loading JSON data...');
    fetch('data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded successfully');
            callback(data);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            // Initialize with empty data structure
            callback({
                isLoaded: true,
                header: {
                    index: true,
                    news: false,
                    research: true,
                    publication: false,
                    fun: true,
                    blog: true
                },
                name_en: "Error Loading Data",
                name_tag: "Please refresh the page",
                email: "",
                city: "",
                introduction: "There was an error loading the page content. Please try refreshing the page.",
                news: [],
                publication: [],
                team: [],
                blogPosts: []
            });
        });
}

function init() {
    console.log('Initializing...');
    loadJSON(function(data) {
        index_render(data);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Add blog data to the header data
headerData.blog = true;
headerData.currentPage = window.location.pathname.endsWith('blog.html') ? 'blog' : 
                         window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'index' :
                         window.location.pathname.endsWith('news.html') ? 'news' :
                         window.location.pathname.endsWith('publication.html') ? 'publication' : '';

// Add blog posts data
const blogPosts = [
    {
        title: "Introduction to Optimal Transport Theory",
        date: "March 15, 2024",
        summary: "A comprehensive introduction to optimal transport theory, its mathematical foundations, and applications in machine learning.",
        image: "images/blog/optimal-transport.jpg",
        url: "blog/optimal-transport-introduction.html"
    },
    {
        title: "Wasserstein GANs: A Deep Dive",
        date: "March 10, 2024",
        summary: "Exploring the connection between optimal transport and generative adversarial networks, with a focus on Wasserstein GANs.",
        image: "images/blog/wgan.jpg",
        url: "blog/wasserstein-gans.html"
    },
    {
        title: "Optimal Transport in Natural Language Processing",
        date: "March 5, 2024",
        summary: "How optimal transport is revolutionizing natural language processing tasks, from text generation to document classification.",
        image: "images/blog/nlp.jpg",
        url: "blog/ot-nlp.html"
    }
];

// Add blog posts to the container data
containerData.blogPosts = blogPosts;


