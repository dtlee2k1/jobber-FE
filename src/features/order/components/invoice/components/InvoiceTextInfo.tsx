import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: '#3E3E3E' },
  titleContainer: { flexDirection: 'row', marginTop: 20 },
  info: { fontSize: 9 }
})

export default function InvoiceTextInfo() {
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View>
            <Text style={styles.info}>Purchased on Jobber</Text>
            <Text style={styles.info}>Have an invoice or billing question? Contact us</Text>
          </View>
        </View>
      </View>
    </>
  )
}
