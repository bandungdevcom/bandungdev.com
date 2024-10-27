import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    position: "relative",
  },
  container: {
    width: "100vw",
    height: "100vh",
  },
  backgroundImage: {
    height: "100vh",
    width: "70vw",
    position: "absolute",
    objectFit: "contain",
    objectPosition: "top right",
    opacity: 0.05,
    top: 0,
    right: 0,
    zIndex: 1,
  },
  section: {
    margin: "20 30",
    padding: 20,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 10,
  },
  title: {
    fontSize: "30px",
  },
  bandungDevIcon: {
    width: "200px",
    height: "50px",
    objectPosition: "center left",
    objectFit: "contain",
    marginBottom: "10px",
  },
  containerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  name: {
    fontSize: "36px",
    color: "#3C83F6",
  },
  containerContentDetail: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  signature: {
    height: "60px",
    width: "60px",
  },
  signatureTitle: {
    marginTop: "5px",
    fontSize: "10px",
  },
})

interface CertificateType {
  eventName: string
  fullName: string
  date: string
}

export function Certificate({ eventName, fullName, date }: CertificateType) {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={"public/images/logos/png/bandungdev-icon-white.png"}
          />
          <View style={styles.section}>
            <View>
              <Image
                style={styles.bandungDevIcon}
                source={"public/images/logos/png/bandungdev-logo-text.png"}
              />
              <Text style={styles.title}>CERTIFICATE OF ATTENDANCE</Text>
            </View>
            <View style={styles.containerContent}>
              <Text>This certificate is presented to</Text>
              <Text style={styles.name}>{fullName}</Text>
              <View style={styles.containerContentDetail}>
                <Text>for attending {eventName}</Text>
                <Text>{date}</Text>
              </View>
            </View>
            <View>
              <Image
                style={styles.signature}
                source={"public/images/signatures/haidar.jpeg"}
              />
              <Text>M. Haidar Hanif</Text>
              <Text style={styles.signatureTitle}>Lead BandungDev</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
