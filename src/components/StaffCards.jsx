import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';

const StaffCards = () => {
  const staff = [
    {
      name: 'Chef Ahmed',
      title: 'Head Chef',
      handle: 'chefAhmed',
      status: 'Crafting Culinary Excellence',
      contactText: 'Contact',
      avatarUrl: '/assets/staff/chef-1.png',
      department: 'Kitchen',
      experience: '12+ Years',
      specialty: 'Kashmiri Cuisine',
      behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,100%,var(--card-opacity)) 4%,hsla(0,0%,80%,calc(var(--card-opacity)*0.5)) 10%,hsla(0,0%,60%,calc(var(--card-opacity)*0.3)) 50%,hsla(0,0%,40%,0) 100%)',
      innerGradient: 'linear-gradient(145deg,#2a2520 0%,#1a1a1a 100%)'
    },
    {
      name: 'Chef Rajesh',
      title: 'Sous Chef',
      handle: 'chefRajesh',
      status: 'Creating Masterpieces',
      contactText: 'Contact',
      avatarUrl: '/assets/staff/chef-2.png',
      department: 'Kitchen',
      experience: '8+ Years',
      specialty: 'Continental Cuisine',
      behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,100%,var(--card-opacity)) 4%,hsla(0,0%,80%,calc(var(--card-opacity)*0.5)) 10%,hsla(0,0%,60%,calc(var(--card-opacity)*0.3)) 50%,hsla(0,0%,40%,0) 100%)',
      innerGradient: 'linear-gradient(145deg,#252218 0%,#1a1a1a 100%)'
    },
    {
      name: 'Chef Arjun',
      title: 'Pastry Chef',
      handle: 'chefArjun',
      status: 'Sweet Innovations',
      contactText: 'Contact',
      avatarUrl: '/assets/staff/chef-3.png',
      department: 'Pastry',
      experience: '6+ Years',
      specialty: 'Artisan Desserts',
      behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,100%,var(--card-opacity)) 4%,hsla(0,0%,80%,calc(var(--card-opacity)*0.5)) 10%,hsla(0,0%,60%,calc(var(--card-opacity)*0.3)) 50%,hsla(0,0%,40%,0) 100%)',
      innerGradient: 'linear-gradient(145deg,#252520 0%,#1a1a1a 100%)'
    },
    {
      name: 'Chef Priya',
      title: 'Line Cook',
      handle: 'chefPriya',
      status: 'Perfecting Every Dish',
      contactText: 'Contact',
      avatarUrl: '/assets/staff/chef-4.png',
      department: 'Kitchen',
      experience: '4+ Years',
      specialty: 'Traditional Recipes',
      behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,100%,var(--card-opacity)) 4%,hsla(0,0%,80%,calc(var(--card-opacity)*0.5)) 10%,hsla(0,0%,60%,calc(var(--card-opacity)*0.3)) 50%,hsla(0,0%,40%,0) 100%)',
      innerGradient: 'linear-gradient(145deg,#252822 0%,#1a1a1a 100%)'
    }
  ];

  const handleStaffContact = (member) => {
    console.log(`Contacting ${member.name}`);
    // You can implement actual contact functionality here
  };

  return (
    <div className="staff-cards-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {staff.map((member, index) => (
          <motion.div
            key={member.handle}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-sm">
              <ProfileCard
                name={member.name}
                title={member.title}
                handle={member.handle}
                status={member.status}
                contactText={member.contactText}
                avatarUrl={member.avatarUrl}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGradient={member.behindGradient}
                innerGradient={member.innerGradient}
                onContactClick={() => handleStaffContact(member)}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffCards;
