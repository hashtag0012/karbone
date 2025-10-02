import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Leaf, Flame, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import FlipbookMenu from '../components/FlipbookMenu'
import '../components/FlipbookMenu.css'

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('starters')

  const categories = [
    { id: 'starters', name: 'Starters', icon: Star },
    { id: 'mains', name: 'Main Course', icon: Award },
    { id: 'grills', name: 'Grills', icon: Flame },
    { id: 'desserts', name: 'Desserts', icon: Star },
    { id: 'beverages', name: 'Beverages', icon: Leaf }
  ]

  const menuItems = {
    starters: [
      {
        name: 'Kashmiri Seekh Kebab',
        description: 'Tender lamb seekh infused with traditional spices, served with mint chutney',
        price: '₹850',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: false
      },
      {
        name: 'Paneer Tikka Royal',
        description: 'Marinated cottage cheese with bell peppers in tandoor spices',
        price: '₹650',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Saffron Chicken Wings',
        description: 'Succulent wings marinated in saffron and aromatic spices',
        price: '₹750',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: false
      },
      {
        name: 'Mushroom Galouti',
        description: 'Melt-in-mouth mushroom patties with traditional spices',
        price: '₹550',
        image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Fish Amritsari',
        description: 'Crispy fish fillets with traditional Punjabi spices',
        price: '₹950',
        image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: false
      },
      {
        name: 'Stuffed Mushrooms',
        description: 'Button mushrooms stuffed with herbed cream cheese',
        price: '₹450',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      }
    ],
    mains: [
      {
        name: 'Wazwan Special Rogan Josh',
        description: 'Traditional Kashmiri lamb curry with aromatic spices and yogurt',
        price: '₹1,450',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: false
      },
      {
        name: 'Paneer Makhani',
        description: 'Creamy tomato-based curry with cottage cheese and butter',
        price: '₹850',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Kashmiri Pulao',
        description: 'Fragrant basmati rice with dry fruits, saffron, and aromatic spices',
        price: '₹750',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      },
      {
        name: 'Butter Chicken',
        description: 'Tender chicken in rich tomato and cream sauce',
        price: '₹1,150',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: false
      },
      {
        name: 'Dal Karborne',
        description: 'Mixed lentils tempered with ghee and aromatic spices',
        price: '₹550',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      },
      {
        name: 'Fish Curry Kashmir',
        description: 'Fresh fish in traditional Kashmiri spices and yogurt gravy',
        price: '₹1,250',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: false
      }
    ],
    grills: [
      {
        name: 'Tandoori Lamb Chops',
        description: 'Succulent lamb chops marinated in yogurt and spices',
        price: '₹1,650',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: false
      },
      {
        name: 'Tandoori Chicken Full',
        description: 'Whole chicken marinated in traditional tandoori spices',
        price: '₹1,350',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: false
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet with herbs and lemon butter',
        price: '₹1,550',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: false
      },
      {
        name: 'Vegetable Seekh',
        description: 'Mixed vegetable seekh with aromatic spices',
        price: '₹650',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Prawns Tandoori',
        description: 'Jumbo prawns marinated in tandoori spices',
        price: '₹1,450',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: false
      },
      {
        name: 'Paneer Tikka Achari',
        description: 'Cottage cheese marinated in pickle spices',
        price: '₹750',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      }
    ],
    desserts: [
      {
        name: 'Saffron Kulfi',
        description: 'Traditional Indian ice cream infused with saffron and pistachios',
        price: '₹350',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      },
      {
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings in rose-flavored sugar syrup',
        price: '₹300',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Chocolate Fondant',
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        price: '₹450',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Ras Malai',
        description: 'Soft cottage cheese dumplings in sweetened milk',
        price: '₹350',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Tiramisu Kashmir',
        description: 'Italian classic with a Kashmiri twist of saffron and cardamom',
        price: '₹550',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      },
      {
        name: 'Phirni',
        description: 'Traditional rice pudding with almonds and rose petals',
        price: '₹300',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      }
    ],
    beverages: [
      {
        name: 'Kashmiri Kahwa',
        description: 'Traditional green tea with saffron, cardamom, and almonds',
        price: '₹250',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      },
      {
        name: 'Fresh Lime Soda',
        description: 'Refreshing lime with soda and mint',
        price: '₹180',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Mango Lassi',
        description: 'Creamy yogurt drink with fresh mango pulp',
        price: '₹220',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Masala Chai',
        description: 'Spiced tea with cardamom, ginger, and cinnamon',
        price: '₹150',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Fresh Fruit Juice',
        description: 'Seasonal fresh fruit juices (Orange, Apple, Pomegranate)',
        price: '₹200',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: false,
        vegetarian: true
      },
      {
        name: 'Saffron Milk',
        description: 'Warm milk infused with saffron and cardamom',
        price: '₹280',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specialty: true,
        vegetarian: true
      }
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <FlipbookMenu />
    </motion.div>
  )
}

export default Menu
