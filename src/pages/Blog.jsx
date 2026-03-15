import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { blogPosts, companyInfo } from '../data/mockData';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = `Blog - ${companyInfo.name}`;
    
    // Get unique categories
    const uniqueCategories = ['All', ...new Set(blogPosts.map(post => post.category))];
    setCategories(uniqueCategories);
    
    // Sort posts by latest date first
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredPosts(sortedPosts);
  }, []);

  useEffect(() => {
    // Sort posts by latest date first
    let sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Filter by category
    if (selectedCategory !== 'All') {
      sorted = sorted.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      sorted = sorted.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(sorted);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get featured post (most recent)
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Animated Background */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.15, 0.1, 0.15],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 -right-10 lg:top-20 lg:-right-20 w-64 h-64 lg:w-96 lg:h-96 bg-blue-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-10 -left-10 lg:-bottom-20 lg:-left-20 w-64 h-64 lg:w-96 lg:h-96 bg-blue-300 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg mb-4 sm:mb-6"
            >
              <Sparkles className="text-blue-500" size={16} />
              <span className="text-xs sm:text-sm font-semibold text-blue-600">
                Fresh Insights & Ideas
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Explore Our{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4">
              Stay updated with the latest trends, insights, and best practices in technology and digital innovation.
            </p>

            {/* Search Bar in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto px-4"
            >
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-white bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 sm:py-6 sticky top-16 sm:top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="text-gray-500 flex-shrink-0" size={18} />
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              {searchTerm || selectedCategory !== 'All' 
                ? `Found ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}` 
                : `${filteredPosts.length} Latest Articles`}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !searchTerm && selectedCategory === 'All' && (
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4 sm:mb-6"
            >
              <TrendingUp className="text-blue-600" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Article</h2>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <Link to={`/blog/${featuredPost.id}`}>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative h-48 sm:h-64 lg:h-full overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                          <Sparkles size={14} />
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                      <div className="mb-3 sm:mb-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {featuredPost.category}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {featuredPost.title}
                      </h3>

                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} />
                          <span className="hidden sm:inline">{formatDate(featuredPost.date)}</span>
                          <span className="sm:hidden">{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">
                          By {featuredPost.author}
                        </span>
                        <div className="inline-flex items-center text-blue-600 font-bold group-hover:gap-2 gap-1.5 transition-all duration-300 text-sm sm:text-base">
                          Read Article
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-20"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <>
              {(searchTerm || selectedCategory !== 'All' || !featuredPost) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link to={`/blog/${post.id}`}>
                        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                          <div className="relative overflow-hidden h-44 sm:h-56">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                              <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold shadow-lg">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 sm:p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2 sm:mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span className="hidden sm:inline">{formatDate(post.date)}</span>
                                <span className="sm:hidden">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{post.readTime}</span>
                              </div>
                            </div>

                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                              {post.title}
                            </h3>

                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1">{post.excerpt}</p>

                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate mr-2">
                                {post.author}
                              </span>
                              <div className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 gap-1 transition-all duration-300 text-sm whitespace-nowrap">
                                Read
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}

              {!searchTerm && selectedCategory === 'All' && featuredPost && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {regularPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link to={`/blog/${post.id}`}>
                        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                          <div className="relative overflow-hidden h-44 sm:h-56">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                              <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold shadow-lg">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 sm:p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2 sm:mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span className="hidden sm:inline">{formatDate(post.date)}</span>
                                <span className="sm:hidden">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{post.readTime}</span>
                              </div>
                            </div>

                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                              {post.title}
                            </h3>

                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1">{post.excerpt}</p>

                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate mr-2">
                                {post.author}
                              </span>
                              <div className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 gap-1 transition-all duration-300 text-sm whitespace-nowrap">
                                Read
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-blue-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-4 sm:mb-6"
            >
              <Sparkles size={36} className="sm:w-12 sm:h-12 text-blue-200" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Never Miss an Update
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-6 sm:mb-8 lg:mb-10 leading-relaxed px-4">
              Join our community and get the latest insights, tips, and industry updates delivered straight to your inbox.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-xl mx-auto px-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl text-sm sm:text-base"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-sm sm:text-base whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </motion.div>

            <p className="text-xs sm:text-sm text-blue-200 mt-4 sm:mt-6 px-4">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Blog;