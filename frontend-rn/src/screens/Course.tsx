import React, { useState, useRef, RefObject } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import type { DrawerScreenProps, AccordionRenderFC, AccordionSection } from '../interfaces/helper.interface';
import Accordion from 'react-native-collapsible/Accordion';
import PlusIcon from '../assets/icons/Plus.svg';
import EditIcon from '../assets/icons/Edit.svg';
import NotificationIcon from '../assets/icons/Notification.svg';
import NotificationActiveIcon from '../assets/icons/NotificationActive.svg';
import TrashIcon from '../assets/icons/Trash.svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Modal from 'react-native-modalbox';
import CourseActionModal from '../components/CourseActionModal';
import globalStyles from '../styles/global.style';
import { useGetCoursesQuery } from '../store/api/course.api';
import { useAppSelector } from '../hooks/store.hook';

const courseSectionTitle: AccordionRenderFC<{ actionModal: RefObject<Modal> }> = ({ actionModal }, __, index) => {
  if (index !== 0) return <></>;
  return (
    <View style={styles.sectionTitle}>
      <Text style={[globalStyles.text]}>Here are all your courses:</Text>
      <TouchableWithoutFeedback onPress={() => actionModal.current?.open()}>
        <PlusIcon width={25} height={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const courseHeader: AccordionRenderFC = (_, section, __, isActive) => {
  return (
    <View style={[styles.header, { backgroundColor: isActive ? '#4845d2' : '#dadaf6' }]}>
      <Text style={[globalStyles.text, styles.headerText, { color: isActive ? 'white' : '#070715' }]}>
        {section.title}
      </Text>
      <View style={styles.headerActions}>
        <TouchableWithoutFeedback onPress={() => console.log('trigger notification')}>
          {true ? (
            <NotificationIcon style={styles.headerActionBtn} width={20} height={20} />
          ) : (
            <NotificationActiveIcon style={styles.headerActionBtn} width={20} height={20} />
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('trigger edit')}>
          <EditIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('trigger delete')}>
          <TrashIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const courseContent: AccordionRenderFC = (_, section) => {
  return (
    <View style={styles.content}>
      {/* <Text style={[globalStyles.text]}>{section.content}</Text> */}
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Course Name</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>Operating System</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Course Code</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>CSC404</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Exam Starts</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>10-10-2022 by 11:30am</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Exam Ends</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>10-10-2022 by 11:30am</Text>
        </Text>
      </View>
    </View>
  );
};

const Course: React.FC<DrawerScreenProps> = ({ navigation }) => {
  const user_id = useAppSelector((state) => state.auth.userInfo?.id as string);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections] = useState<AccordionSection[]>([
    {
      title: 'First',
      content: 'First Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Second Lorem ipsum...',
    },
    {
      title: 'Third',
      content: 'Third Lorem ipsum...',
    },
  ]);
  const actionModal = useRef<Modal>(null);
  const { data, isFetching, isLoading } = useGetCoursesQuery({ user_id });

  const handleAccordionChange = (newActiveSections: number[]) => {
    setActiveSections(newActiveSections);
  };

  console.log('Course Screen');
  console.log('data => ', data);

  return (
    <View>
      <CustomHeader navigation={navigation} title="Course" />
      <ScrollView style={styles.scrollView}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderSectionTitle={(...args) => courseSectionTitle({ actionModal }, ...args)}
          renderHeader={(...args) => courseHeader({}, ...args)}
          renderContent={(...args) => courseContent({}, ...args)}
          onChange={handleAccordionChange}
        />
      </ScrollView>

      <CourseActionModal actionModal={actionModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#dadaf6',
    padding: 15,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    margin: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 0,
    backgroundColor: '#edecfb',
  },
  scrollView: {
    marginBottom: 60,
  },
  sectionTitle: {
    padding: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  listItemChild1: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemChild2: {
    paddingLeft: 15,
    width: wp('100%') - 135,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerActionBtn: {
    marginLeft: 15,
    borderWidth: 2,
  },
});

export default Course;
