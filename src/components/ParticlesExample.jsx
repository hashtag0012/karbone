import Particles from './Particles';

const ParticlesExample = () => {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
};

export default ParticlesExample;
