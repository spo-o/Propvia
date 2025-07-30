import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function BlogScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Example blog posts from your website
  const blogPosts = [
    {
      id: 1,
      title: "Detroit's $2.1B Commercial Property Renaissance: Your 2024 Investment Guide",
      excerpt: "An in-depth analysis of Detroit's commercial property market transformation, featuring AI-driven insights and real success stories.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
    },
    {
      id: 2,
      title: "From Vacant to Vibrant: 5 Detroit Success Stories That Will Inspire You",
      excerpt: "Real stories of entrepreneurs who transformed vacant properties into thriving community assets, complete with ROI analysis and practical lessons.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    },
    {
      id: 3,
      title: "The Ultimate Guide to Detroit Commercial Property Analysis",
      excerpt: "Learn how to use AI and data analytics to evaluate commercial properties and make informed investment decisions in Detroit's evolving market.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>← Back to Info</Text>
      </TouchableOpacity>

      <Text style={[styles.header, { color: colors.text }]}>Latest Insights</Text>
      <Text style={[styles.paragraph, { color: colors.description }]}>
        Expert analysis and insights about Detroit's commercial property market, urban development, and investment opportunities.
      </Text>

      {blogPosts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <Image source={{ uri: post.image }} style={styles.image} />
          <Text style={[styles.postTitle, { color: colors.text }]}>{post.title}</Text>
          <Text style={[styles.postExcerpt, { color: colors.description }]}>{post.excerpt}</Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read More →</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { fontSize: 18, fontWeight: '600', color: '#F7C948', marginBottom: 10 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  paragraph: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  postContainer: { marginBottom: 30 },
  image: { width: '100%', height: 180, borderRadius: 8, marginBottom: 10 },
  postTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  postExcerpt: { fontSize: 15, marginBottom: 5 },
  readMore: { color: '#F7C948', fontWeight: 'bold' }
});