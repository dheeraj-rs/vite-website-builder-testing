import { supabase } from './supabase';
import { defaultTemplates } from './templates';

export async function seedTemplates() {
  try {
    const { data: existingTemplates } = await supabase
      .from('templates')
      .select('id')
      .limit(1);

    if (existingTemplates && existingTemplates.length > 0) {
      return;
    }

    const { error } = await supabase
      .from('templates')
      .insert(defaultTemplates);

    if (error) throw error;
    console.log('Templates seeded successfully');
  } catch (error) {
    console.error('Error seeding templates:', error);
  }
}
