import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  Star,
  Clock,
  Package,
  CheckCircle,
  BookOpen,
  Newspaper,
  TabletSmartphone,
  Globe,
  Award,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { productAPI } from "../lib/api";

export default function LandingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productAPI.featured();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setProducts([]);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "print") return product.type === "PRINT";
    if (activeTab === "digital") return product.type === "DIGITAL";
    if (activeTab === "combo") return product.type === "PRINT_AND_DIGITAL";
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-100 via-secondary-50 to-primary-100 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                  Elevate Your Reading
                </span>
                <br />
                Experience
              </h1>
              <p className="text-xl text-gray-600">
                Premium subscriptions for print, digital, or both. Curated
                content from the world's best publishers delivered how you want
                it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/20"
                  onClick={() => navigate("/plans")}
                >
                  Explore Plans <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document.getElementById("products")?.scrollIntoView()
                  }
                >
                  View Pricing
                </Button>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <img
                      key={item}
                      src={`https://randomuser.me/api/portraits/${
                        item % 2 === 0 ? "women" : "men"
                      }/${item}.jpg`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      alt="User"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Join <span className="font-semibold">10,000+</span>{" "}
                    subscribers
                  </p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-2">5.0 (2.4k reviews)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-6 w-6 text-primary-600" />
                        <span className="font-semibold">
                          NewsCorp - FSS Premium
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Print Edition</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Digital Access</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Monthly
                          </Button>
                          <Button size="sm">Yearly</Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-3xl font-bold">$29</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                        <Button className="bg-primary-600 hover:bg-primary-700">
                          Subscribe Now
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Save 20% with annual billing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">
            TRUSTED BY LEADING PUBLISHERS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {["The Times", "New Yorker", "Atlantic", "Wired", "Forbes"].map(
              (name, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-xl font-medium text-gray-700"
                >
                  {name}
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Readers Choose NewsCorp - FSS
            </h2>
            <p className="text-xl text-gray-600">
              We've reimagined the subscription experience to give you more of
              what you love.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Newspaper className="h-8 w-8 text-primary-600" />,
                title: "Print Perfection",
                description:
                  "Premium quality print delivered to your doorstep with flexible scheduling options.",
              },
              {
                icon: <TabletSmartphone className="h-8 w-8 text-primary-600" />,
                title: "Digital Excellence",
                description:
                  "Seamless reading experience across all your devices with offline access.",
              },
              {
                icon: <Globe className="h-8 w-8 text-primary-600" />,
                title: "Global Content",
                description:
                  "Access international editions and exclusive global content not available elsewhere.",
              },
              {
                icon: <Award className="h-8 w-8 text-primary-600" />,
                title: "Curated Selections",
                description:
                  "Expertly curated content tailored to your interests and reading habits.",
              },
              {
                icon: <Bookmark className="h-8 w-8 text-primary-600" />,
                title: "Save & Organize",
                description:
                  "Bookmark, annotate, and organize your favorite articles for future reference.",
              },
              {
                icon: <Clock className="h-8 w-8 text-primary-600" />,
                title: "Early Access",
                description:
                  "Get content before it's officially published with our subscriber previews.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-primary-50 rounded-lg w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="products"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscription Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan that fits your reading style and
              preferences.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              {["all", "print", "digital", "combo"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab)}
                  className="capitalize"
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`overflow-hidden transition-all ${
                      product.featured ? "border-2 border-primary-500" : ""
                    }`}
                  >
                    {product.featured && (
                      <div className="bg-primary-600 text-white text-sm font-medium py-1 px-4 text-center">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {product.name}
                          </CardTitle>
                          <CardDescription>
                            {product.description}
                          </CardDescription>
                        </div>
                        <div className="p-3 bg-primary-100 rounded-lg">
                          {product.type === "print" && (
                            <Newspaper className="h-6 w-6 text-primary-600" />
                          )}
                          {product.type === "digital" && (
                            <TabletSmartphone className="h-6 w-6 text-primary-600" />
                          )}
                          {product.type === "combo" && (
                            <Package className="h-6 w-6 text-primary-600" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <div className="mb-6">
                        <span className="text-3xl font-bold">
                          ${product.price}
                        </span>
                        <span className="text-gray-600">
                          /{product.billing_cycle}
                        </span>
                      </div>

                      <div className="space-y-3 mb-8">
                        {[
                          product.type === "print"
                            ? "Print edition delivered weekly"
                            : "",
                          product.type === "digital"
                            ? "Unlimited digital access"
                            : "",
                          product.type === "combo"
                            ? "Print + Digital bundle"
                            : "",
                          "Cancel anytime",
                          "24/7 customer support",
                        ]
                          .filter(Boolean)
                          .map((feature, i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                      </div>

                      <Button className="w-full" size="lg">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">
                  No products found in this category
                </p>
              </div>
            )}
          </motion.div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/plans")}
            >
              View All Subscription Plans{" "}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-primary-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                More Than Just a Subscription
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're building a community of passionate readers with exclusive
                benefits.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Member-Only Events",
                    description:
                      "Virtual and in-person events with authors and thought leaders",
                  },
                  {
                    title: "Early Access Content",
                    description:
                      "Read articles before they're published to the public",
                  },
                  {
                    title: "Premium Support",
                    description:
                      "Dedicated customer service for all your needs",
                  },
                  {
                    title: "Reading Analytics",
                    description:
                      "Track your reading habits and get personalized recommendations",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg mt-1">
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/banner-image.jpg"
                  alt="Reading group"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      Join Our Reading Community
                    </h3>
                    <p className="text-gray-200">
                      Connect with fellow book lovers and expand your horizons
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Readers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our community of
              subscribers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Book Club Organizer",
                content:
                  "The print quality is exceptional and the digital app makes it easy to switch between devices seamlessly.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Avid Reader",
                content:
                  "I've tried many subscriptions but NewsCorp - FSS's curated content is truly next level. Worth every penny.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Literature Professor",
                content:
                  "My students and I appreciate the depth of analysis in the articles. It's become required reading for my courses.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6">
                  <CardContent className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4 pt-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={`https://randomuser.me/api/portraits/${
                            index % 2 === 0 ? "women" : "men"
                          }/${index + 10}.jpg`}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-white.svg')] bg-center"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Transform Your Reading Experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-primary-100 mb-8"
            >
              Join thousands of readers who've discovered their next favorite
              read with NewsCorp - FSS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg"
                onClick={() => navigate("/plans")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white bg-transparent hover:bg-white/10"
                onClick={() =>
                  document.getElementById("products")?.scrollIntoView()
                }
              >
                View Plans
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-600">
                  Subscribe to our newsletter for the latest releases and
                  exclusive offers.
                </p>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
