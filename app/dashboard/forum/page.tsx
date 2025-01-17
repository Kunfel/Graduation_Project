'use client'

import MedicalGroup from "./_components/MedicalGroup"

const medicalGroups = [
  {
    name: 'Diabetes Support Group',
    posts: [
      { id: 1, title: 'Managing blood sugar levels', author: 'DiabetesExpert', content: 'Here are some tips for managing your blood sugar...' },
      { id: 2, title: 'New insulin pump review', author: 'TechSavvyDiabetic', content: 'I recently started using the new XYZ insulin pump...' },
    ]
  },
  {
    name: 'Heart Health Group',
    posts: [
      { id: 1, title: 'Exercise routines for heart patients', author: 'CardioDoc', content: 'Regular exercise is crucial for heart health...' },
      { id: 2, title: 'Heart-healthy diet tips', author: 'NutritionistJane', content: 'Incorporating these foods into your diet can improve heart health...' },
    ]
  },
]

export default function Forum() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl text-blue-600">Medical Support Forums</h1>
      <div>
        {medicalGroups.map((group, index) => (
          <MedicalGroup key={index} name={group.name} initialPosts={group.posts} />
        ))}
      </div>
    </div>
  )
}


