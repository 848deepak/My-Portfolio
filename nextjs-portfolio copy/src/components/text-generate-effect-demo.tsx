import { TextGenerateEffect } from './ui/text-generate-effect';
import { personalInfo } from '@/lib/data';

const TextGenerateEffectDemo = () => {
  return (
    <TextGenerateEffect 
      words={personalInfo.title}
      className="text-lg text-gray-400 max-w-2xl mx-auto"
    />
  );
};

export default TextGenerateEffectDemo;
 