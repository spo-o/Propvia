import { useParams } from 'react-router-dom';
import GuideContentViewer from '../components/GuideContentViewer';
import { guides } from './Guides';

export default function GuidePage() {
  const { id } = useParams();
  const guide = guides.find(g => g.id === id);
  
  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Guide not found</h1>
      </div>
    );
  }

  return (
    <GuideContentViewer 
      title={guide.title} 
      content={guide.sections[0].content} 
    />
  );
}