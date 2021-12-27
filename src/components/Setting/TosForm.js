import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';

const TosForm = () => (
  <View style={{ margin: 20 * tmpWidth }}>
    <Text style={{ fontWeight: '700', marginTop: 20 * tmpWidth }}>제1장. 총칙</Text>
    <Text style={styles.title}>제 1 조 (목적)</Text>
    <Text style={styles.top}>
      본 약관은 회원이 ㈜음파(이하 “회사”라 합니다)에서 제공하는 유무선 온라인상에서 제공되는 umpa
      서비스(이하 `&apos;`서비스`&apos;`라 한다)의 회원과 회사간의 권리, 의무, 책임사항 및 회원의
      서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.
    </Text>
    <Text style={styles.title}>제 2 조 (약관의 효력 및 변경)</Text>
    <Text style={styles.top}>
      1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
    </Text>
    <Text style={styles.top}>
      2. 본 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지하고, 이에 동의한
      회원이 서비스에 가입함으로써 효력이 발생합니다.
    </Text>
    <Text style={styles.top}>
      3. 회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 약관이 변경된 경우에는 지체
      없이 제2항과 같은 방법으로 공지합니다. 다만, 이용자의 권리 또는 의무에 관한 중요한 규정의
      변경은 최소한 7일전에 공지하며 개정 내용이 이용자에게 불리할 경우에는 30일간 고지합니다.
    </Text>
    <Text style={styles.top}>
      4. 회사가 본 조 제 3항에 따라 변경 약관을 공지 또는 통지하면서, 회원에게 약관 변경 적용일까지
      거부의사를 표시하지 아니하는 경우 약관의 변경의 동의한 것으로 간주한다는 내용을 명확하게 공지
      또는 통지하였음에도 회원이 변경된 약간의 효력 발생일까지 약관변경에 대한 명시적인 거부의
      의사를 표시하지 아니하면 회원이 변경 약관에 동의한 것으로 간주합니다.
    </Text>
    <Text style={styles.top}>
      5. 이용자는 변경된 약관 사항에 동의하지 않으면 서비스 이용을 중단하고 이용 계약을 해지할 수
      있습니다.
    </Text>
    <Text style={styles.title}>제 3 조 (약관 외 준칙)</Text>
    <Text style={styles.top}>
      본 약관에 명시되지 않은 사항에 대해서는 전기통신기본법, 전기통신사업법 등 관계법령 및 회사가
      별도로 정한 서비스의 세부이용지침 등의 규정에 의합니다.
    </Text>
    <Text style={styles.title}>제 4 조 (용어의 정의)</Text>
    <Text style={styles.top}>1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</Text>
    <Text style={styles.top}>
      (1) 회원 : 서비스에 접속하여 본 약관, 서비스 상품약관 및 개인정보 수집 및 이용에 대한 안내에
      동의한 후 서비스 회원번호 보유하고 umpa 아이디(ID)와 비밀번호(PASSWORD)를 발급 받아 웹,모바일
      등의 모든 채널의 서비스를 이용 가능한 고객
    </Text>
    <Text style={styles.top}>
      (2) 아이디(ID) : 회원 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는
      영문자 또는 숫자로 생성하여 이용 가능
    </Text>
    <Text style={styles.top}>
      (3) 비밀번호(PASSWORD) : 회원의 정보 보호를 위해 회원 자신이 설정한 영문자, 숫자 또는
      특수문자를 사용하여 최저 8자에서 최대 20자까지의 조합으로 설정 가능
    </Text>
    <Text style={styles.top}>
      (4) 운영자 : 서비스의 전반적인 관리와 원활한 운영을 위하여 회사가 선정한 자
    </Text>
    <Text style={styles.top}>
      (5) 서비스 중지 : 정상 이용 중 회사가 정한 일정한 요건에 따라 일정기간 동안 서비스의 제공을
      중지하는 것
    </Text>
    <Text style={styles.top}>
      2. 본 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관계 법령 및 서비스별
      안내에서 정하는 바에 의합니다.
    </Text>
    <Text style={{ fontWeight: '700', marginTop: 20 * tmpWidth }}>제 2 장 서비스 이용 계약</Text>
    <Text style={styles.title}>제 5 조(이용 계약의 성립)</Text>
    <Text style={styles.top}>
      1. 약관, 서비스 상품약관 및 개인정보 수집 및 이용에 대한 안내에 대하여 고객이 동의를 선택한 후
      `&quot;`동의`&quot;` 버튼을 누르면 약관에 동의하는 것으로 간주됩니다.
    </Text>
    <Text style={styles.top}>
      2. 이용 계약은 고객의 이용 신청에 대하여 회사의 승낙이 고객의 컴퓨터에 입력된 때에 성립합니다.
    </Text>
    <Text style={styles.title}>제 6 조(이용 신청)</Text>
    <Text style={styles.top}>
      이용 신청은 서비스의 이용자 등록 화면에서 고객이 다음 사항을 가입신청 양식에 기록하는 방식으로
      행합니다.
    </Text>
    <Text style={styles.top}>1. 아이디(ID)</Text>
    <Text style={styles.top}>2. 비밀번호(PASSWORD)</Text>
    <Text style={styles.top}>3. 기타 회사가 필요하다고 인정하는 항목</Text>
    <Text style={styles.title}>제 7 조(이용신청의 승낙)</Text>
    <Text style={styles.top}>
      회사는 제6조에서 정한 사항을 정확히 기재하여 이용 신청한 고객에 대하여 서비스 이용 신청을
      승낙합니다.
    </Text>
    <Text style={styles.title}>제 8 조(이용신청에 대한 승낙의 제한)</Text>
    <Text style={styles.top}>
      1. 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않을 수 있습니다.
    </Text>
    <Text style={styles.top}>(1) 업무상, 기술상 서비스 제공이 불가능한 경우</Text>
    <Text style={styles.top}>(2) 다른 사람의 명의사용 등 이용자 등록 시 허위로 신청하는 경우</Text>
    <Text style={styles.top}>(3) 이용자 등록 사항을 누락하거나 오기하여 신청하는 경우</Text>
    <Text style={styles.top}>
      (4) 사회의 안녕질서 또는 미풍양속을 저해하거나, 저해할 목적으로 신청한 경우
    </Text>
    <Text style={styles.top}>
      (5) 제24조 제2항에 의하여 이전에 회원 자격을 상실한 적이 있는 경우. 다만, 동 자격 상실 이후
      1년 이상 경과한 자로 회사의 회원 재가입 승낙을 받은 경우는 예외로 합니다.
    </Text>
    <Text style={styles.top}>(6) 기타 회사가 정한 이용신청 요건이 만족되지 않았을 경우</Text>
    <Text style={styles.top}>
      2. 회원의 자격 혹은 나이에 따라 서비스 이용의 일부가 제한될 수 있습니다.
    </Text>
    <Text style={styles.title}>제 9 조(계약 사항의 변경)</Text>
    <Text style={styles.top}>
      회원은 이용 신청 시 기재한 사항이 변경되었을 경우 회사가 정한 별도의 이용 방법으로 정해진 양식
      및 방법에 의하여 수정하여야 합니다.
    </Text>
    <Text style={{ fontWeight: '700', marginTop: 20 * tmpWidth }}>제3장 서비스 이용</Text>
    <Text style={styles.title}>제 10 조(서비스의 이용 개시)</Text>
    <Text style={styles.top}>
      1. 회사는 회원의 이용 신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는
      지정된 일자부터 서비스를 개시합니다.
    </Text>
    <Text style={styles.top}>
      2. 회사의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 사이트에
      공지하거나 회원에게 이를 통지합니다.
    </Text>
    <Text style={styles.title}>제 11 조(서비스의 이용시간)</Text>
    <Text style={styles.top}>
      1. 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 회사의 업무 상이나 기술상의
      이유로 서비스가 일지 중지될 수 있고, 또한 운영상의 목적으로 회사가 정한 기간 동안에는 서비스가
      일시 중지될 수 있습니다. 이러한 경우 회사는 사전 또는 사후에 이를 공지합니다.
    </Text>
    <Text style={styles.top}>
      2. 회사는 서비스를 일정범위로 분할하여 각 범위별로 이용 가능한 시간을 별도로 정할 수 있으며 이
      경우 그 내용을 공지합니다.
    </Text>
    <Text style={styles.title}>제 12 조(서비스의 변경 및 중지)</Text>
    <Text style={styles.top}>
      1. 회사는 변경될 서비스의 내용 및 제공일자를 제20조에서 정한 방법으로 회원에게 통지하고
      서비스를 변경하여 제공할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      2. 회사는 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
    </Text>
    <Text style={styles.top}>(1) 서비스용 설비의 보수 등 공사로 인한 부득이한 경우</Text>
    <Text style={styles.top}>(2) 회원이 회사의 영업활동을 방해하는 경우</Text>
    <Text style={styles.top}>
      (3) 정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우
    </Text>
    <Text style={styles.top}>
      (4) 서비스 제공업자와의 계약 종료 등과 같은 회사의 제반 사정으로 서비스를 유지할 수 없는 경우
    </Text>
    <Text style={styles.top}>(5) 기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</Text>
    <Text style={styles.top}>
      3. 제2항에 의한 서비스 중단의 경우에는 회사가 제20조 제2항에서 정한 방법으로 이용자에게
      통지합니다. 다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단 (운영자의 고의, 과실이 없는
      디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 사후에 통지할 수
      있습니다.
    </Text>
    <Text style={styles.top}>
      4. 회사는 서비스의 변경, 중지로 발생하는 문제에 대해서는 어떠한 책임도 지지 않습니다.
    </Text>
    <Text style={styles.title}>제 13 조(정보의 제공 및 광고의 게재)</Text>
    <Text style={styles.top}>
      1. 회사는 서비스의 운영과 관련하여 홈페이지, 서비스 화면, 수신 동의한 e-mail(전자우편) 등에
      각종 정보 및 광고 등을 게재할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      2. 회원이 서비스상에 게재되어 있는 광고를 이용하거나 서비스를 통한 광고주의 판촉활동에
      참여하는 등의 방법으로 교신 또는 거래를 하는 것은 전적으로 회원과 광고주 간의 문제입니다. 만약
      회원과 광고주간에 문제가 발생할 경우에도 회원과 광고주가 직접 해결하여야 하며, 이와 관련하여
      회사는 어떠한 책임도 지지 않습니다.
    </Text>
    <Text style={styles.title}>제 14 조(게시물 또는 내용물의 삭제)</Text>
    <Text style={styles.top}>
      1. 회사는 회원이 게시하거나 전달하는 서비스 내의 모든 내용물(회원간 전달 포함)이 다음 각 호의
      경우에 해당한다고 판단되는 경우 사전통지 없이 삭제할 수 있으며, 이에 대해 회사는 어떠한 책임도
      지지 않습니다.
    </Text>
    <Text style={styles.top}>
      (1) 회사, 다른 회원 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우
    </Text>
    <Text style={styles.top}>
      (2) 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등의 유포에 해당하는 경우
    </Text>
    <Text style={styles.top}>(3) 범죄적 행위에 결부된다고 인정되는 내용인 경우</Text>
    <Text style={styles.top}>
      (4) 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우
    </Text>
    <Text style={styles.top}>
      (5) 제2항 소정의 세부이용지침을 통하여 회사에서 규정한 게시기간을 초과한 경우
    </Text>
    <Text style={styles.top}>(6) 회사에서 제공하는 서비스와 관련 없는 내용인 경우</Text>
    <Text style={styles.top}>(7) 불필요하거나 승인되지 않은 광고, 판촉물을 게재하는 경우</Text>
    <Text style={styles.top}>(8) 기타 관계 법령 및 회사의 지침 등에 위반된다고 판단되는 경우</Text>
    <Text style={styles.top}>
      2. 회사는 게시물에 관련된 세부 이용지침을 별도로 정하여 시행할 수 있으며, 회원은 그 지침에
      따라 각 종 게시물(회원간 전달 포함)을 등록하거나 삭제하여야 합니다.
    </Text>
    <Text style={styles.top}>
      3. 회원은 서비스를 탈퇴하는 경우 서비스 이용 도중 회원 본인이 직접 작성한 일련의 게시물(작성
      등록한 컨텐츠)에 대한 자동 삭제되지 않으므로 삭제를 원하는 경우 탈퇴 이전에 삭제하여야 합니다.
    </Text>
    <Text style={styles.top}>
      4. 회사는 원활한 서비스 제공을 위하여 정기적 또는 비정기적으로 과거의 게시물을 삭제할 수
      있습니다.
    </Text>
    <Text style={styles.title}>제 15 조(게시물의 저작권)</Text>
    <Text style={styles.top}>
      1. 회원이 게시한 게시물은 다음 각 호의 목적에 한하여 회사가 이용할 수 있으며, 이는 이용계약이
      해지된 이후에도 지속적으로 이용할 수 있습니다.
    </Text>
    <Text style={styles.top}>(1) 게시물 검색결과 노출</Text>
    <Text style={styles.top}>(2) 서비스 내에서 서비스 및 관련 프로모션 등에 노출</Text>
    <Text style={styles.top}>
      (3) 제(1)호, 제(2)호와 관련하여 필요한 범위 내에서 일부 수정, 복제, 편집 이용
    </Text>
    <Text style={styles.top}>(4) 기타 서비스 홍보의 목적</Text>
    <Text style={styles.top}>
      2. 회사는 회원 또는 이해관계가 있는 제3자로부터 게시물의 검색결과 노출 중단, 삭제, 비공개 조치
      등의 명시적 요청이 있을 경우에는 그에 따른 조치를 합니다.
    </Text>
    <Text style={styles.top}>
      3. 회사가 제1항 이외의 목적으로 회원의 게시물을 이용하고자 하는 경우에는 전화, 팩스, 전자우편
      등을 통해 사전에 회원의 동의를 얻습니다.
    </Text>
    <Text style={styles.top}>
      4. 회사는 회원이 서비스 내에 게시한 게시물이 타인의 저작권, 프로그램 저작권 등을 침해하더라도
      이에 대한 민,형사상의 책임을 부담하지 않습니다. 만일 회원이 타인의 저작권, 프로그램 저작권
      등을 침해하였음을 이유로 회사가 타인으로부터 손해배상청구 등 이의 제기를 받은 경우 회원은
      회사의 면책을 위하여 노력하여야 하며, 회사가 면책되지 못한 경우 회원은 그로 인해 회사에 발생한
      모든 손해를 부담하여야 합니다.
    </Text>
    <Text style={styles.top}>
      5. 회사는 회원이 이용계약을 해지하거나 적법한 사유로 이용계약이 해지 된 경우 해당 회원이
      게시하였던 게시물을 삭제할 수 있습니다.
    </Text>
    <Text style={styles.top}>6. 회사가 작성한 저작물에 대한 저작권은 회사에 귀속합니다.</Text>
    <Text style={styles.top}>
      7. 회원은 서비스를 이용하여 얻은 정보를 가공, 판매하는 행위 등 서비스에 게재된 자료를
      영리목적으로 이용하거나 제3자에게 이용하게 할 수 없으며, 게시물에 대한 저작권 침해는 관계
      법령의 적용을 받습니다.
    </Text>
    <Text style={styles.title}>제 16 조(서비스상품 약관)</Text>
    <Text style={styles.top}>
      서비스 이용을 위하여 서비스상품 약관 등 별도의 약관이 존재할 수 있습니다. 추가되는
      서비스상품에 따라 별도의 약관이 존재할 수 있으며, 이용약관과 각 개별 약관의 내용이 상충될 경우
      각 개별 약관이 우선됩니다.
    </Text>
    <Text style={{ fontWeight: '700', marginTop: 20 * tmpWidth }}>제 4 장 계약당사자의 의무</Text>
    <Text style={styles.title}>제 17 조(회사의 의무)</Text>
    <Text style={styles.top}>
      1. 회사는 서비스 제공과 관련하여 알고 있는 회원의 신상정보를 본인의 승낙 없이 제3자에게 누설,
      배포하지 않습니다. 단, 관계법령에 의한 수사상의 목적으로 관계기관으로부터 요구 받은 경우나
      방송통신심의위원회의 요청이 있는 경우 등 법률의 규정에 따른 적법한 절차에 의한 경우에는
      그러하지 않습니다.
    </Text>
    <Text style={styles.top}>
      2. 제1항의 범위 내에서, 회사는 업무와 관련하여 회원의 사전 동의 없이 회원 전체 또는 일부의
      개인 정보에 관한 통계자료를 작성하여 이를 사용할 수 있고, 이를 위하여 회원의 컴퓨터에 쿠키를
      전송할 수 있습니다. 이 경우 회원은 쿠키의 수신을 거부하거나 쿠키의 수신에 대하여 경고하도록
      사용하는 컴퓨터의 브라우저의 설정을 변경할 수 있으며, 쿠키의 설정 변경에 의해 서비스 이용이
      변경되는 것은 회원의 책임입니다.
    </Text>
    <Text style={styles.top}>
      3. 회사는 서비스와 관련한 회원의 불만사항이 접수되는 경우 이를 신속하게 처리하여야 하며,
      신속한 처리가 곤란한 경우 그 사유와 처리 일정을 서비스 화면에 게재하거나 e-mail(전자우편) 등을
      통하여 회원에게 통지합니다.
    </Text>
    <Text style={styles.top}>
      4. 회사가 제공하는 서비스로 인하여 회원에게 손해가 발생한 경우 그러한 손해가 회사의 고의나
      중과실에 기해 발생한 경우에 한하여 회사에서 책임을 부담하며, 그 책임의 범위는 통상 손해에
      한합니다.
    </Text>
    <Text style={styles.top}>
      5. 회사는 정보통신망 이용촉진 및 정보보호에 관한 법률, 통신비밀보호법, 전기통신사업법 등
      서비스의 운영, 유지와 관련 있는 법규를 준수합니다.
    </Text>
    <Text style={styles.title}>제 18 조(회원의 의무)</Text>
    <Text style={styles.top}>
      1. 회원은 서비스를 이용할 때 다음 각 호의 행위를 하여서는 아니 됩니다.
    </Text>
    <Text style={styles.top}>
      (1) 이용 신청 또는 변경 시 허위 사실을 기재하거나, 다른 회원의 아이디(ID) 및 비밀번호를 도용,
      부정하게 사용하는 행위
    </Text>
    <Text style={styles.top}>
      (2) 회사의 서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나
      상업적으로 이용하는 행위
    </Text>
    <Text style={styles.top}>(3) 타인의 명예를 손상시키거나 불이익을 주는 행위</Text>
    <Text style={styles.top}>
      (4) 게시판 등에 음란물을 게재하거나 음란사이트를 연결(링크)하는 행위
    </Text>
    <Text style={styles.top}>(5) 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위</Text>
    <Text style={styles.top}>
      (6) 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음성 등을 타인에게 유포하는 행위
    </Text>
    <Text style={styles.top}>
      (7) 서비스와 관련된 설비의 오 동작이나 정보 등의 파괴 및 혼란을 유발시키는 컴퓨터 바이러스
      감염 자료를 등록 또는 유포하는 행위
    </Text>
    <Text style={styles.top}>
      (8) 서비스 운영을 고의로 방해하거나 서비스의 안정적 운영을 방해할 수 있는 정보 및 수신자의
      명시적인 수신거부의사에 반하여 광고성 정보를 전송하는 행위
    </Text>
    <Text style={styles.top}>
      (9) 타인으로 가장하는 행위 및 타인과의 관계를 허위로 명시하는 행위
    </Text>
    <Text style={styles.top}>(10) 다른 회원의 개인정보를 수집, 저장, 공개하는 행위</Text>
    <Text style={styles.top}>
      (11) 자기 또는 타인에게 재산상의 이익을 주거나 타인에게 손해를 가할 목적으로 허위의 정보를
      유통시키는 행위
    </Text>
    <Text style={styles.top}>(12) 재물을 걸고 도박하거나 사행행위를 하는 행위</Text>
    <Text style={styles.top}>
      (13) 윤락행위를 알선하거나 음행을 매개하는 내용의 정보를 유통시키는 행위
    </Text>
    <Text style={styles.top}>
      (14) 수치심이나 혐오감 또는 공포심을 일으키는 말이나 음향, 글이나 화상 또는 영상을 계속해서
      상대방에게 도달하게 함으로써 상대방의 일상적 생활을 방해하는 행위
    </Text>
    <Text style={styles.top}>(15) 서비스에 게시된 정보를 변경하는 행위</Text>
    <Text style={styles.top}>
      (16) 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 포함)의 전송 또는
      게시 행위
    </Text>
    <Text style={styles.top}>
      (17) 회사의 직원이나 운영자를 가장하거나 사칭하여 또는 타인의 명의를 도용하여 글을 게시하거나
      메일을 발송하는 행위
    </Text>
    <Text style={styles.top}>
      (18) 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된
      소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나
      e-mail(전자우편)으로 발송하는 행위
    </Text>
    <Text style={styles.top}>(19) 스토킹(stalking) 등 다른 회원을 괴롭히는 행위</Text>
    <Text style={styles.top}>(20) 기타 불법적이거나 부당한 행위</Text>
    <Text style={styles.top}>
      2. 회원은 관계 법령, 본 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는
      사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 아니 됩니다.
    </Text>
    <Text style={styles.top}>
      3. 회원은 회사에서 공식적으로 인정한 경우를 제외하고는 서비스를 이용하여 상품을 판매하는 영업
      활동을 할 수 없으며 특히 해킹, 광고를 통한 수익, 음란사이트를 통한 상업행위, 상용소프트웨어
      불법배포 등을 할 수 없습니다. 이를 위반하여 발생한 영업 활동의 결과 및 손실, 관계기관에 의한
      구속 등 법적 조치 등에 관해서는 회사가 책임을 지지 않으며, 회원은 이와 같은 행위와 관련하여
      회사에 대하여 손해배상 의무를 집니다.
    </Text>
    <Text style={styles.top}>
      4. 회원은 서비스 이용을 위해 등록할 경우 현재의 사실과 일치하는 완전한 정보(이하
      `&quot;`등록정보`&quot;`)를 제공하여야 합니다.
    </Text>
    <Text style={styles.top}>
      5. 회원은 등록정보에 변경사항이 발생할 경우 즉시 갱신하여야 합니다. 회원이 제공한 등록정보 및
      갱신한 등록정보가 부정확할 경우, 기타 회원이 본 조 제1항에 명시된 행위를 한 경우에 회사는 본
      약관 제23조에 의해 회원의 서비스 이용을 제한 또는 중지 할 수 있습니다.
    </Text>
    <Text style={styles.title}>
      제 19 조(회원 아이디(ID)와 비밀번호(PASSWORD) 관리에 대한 의무와 책임)
    </Text>
    <Text style={styles.top}>
      1. 회사는 사이트 내에서 일부 서비스 신청 시 이용요금을 부과할 수 있으므로, 회원은 회원
      아이디(ID) 및 비밀번호(PASSWORD) 관리를 철저히 하여야 합니다.
    </Text>
    <Text style={styles.top}>
      2. 회원 아이디(ID)와 비밀번호(PASSWORD)의 관리 소홀, 부정 사용에 의하여 발생하는 모든 결과에
      대한 책임은 회원 본인에게 있으며, 회사의 시스템 고장 등 회사의 책임 있는 사유로 발생하는
      문제에 대해서는 회사가 책임을 집니다.
    </Text>
    <Text style={styles.top}>
      3. 회원은 본인의 아이디(ID) 및 비밀번호(PASSWORD)를 제3자에게 이용하게 해서는 안되며, 회원
      본인의 아이디(ID) 및 비밀번호(PASSWORD)를 도난 당하거나 제3자가 사용하고 있음을 인지하는
      경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우 그에 따라야 합니다.
    </Text>
    <Text style={styles.top}>4. 회원의 아이디(ID)는 회사의 사전 동의 없이 변경할 수 없습니다.</Text>
    <Text style={styles.title}>제 20 조(회원에 대한 통지)</Text>
    <Text style={styles.top}>
      1. 회원에 대한 통지를 하는 경우 회사는 회원이 등록한 e-mail(전자우편) 주소 또는 SMS 등 기타의
      방법으로 회원에게 이를 통지 할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      2. 회사는 불특정 다수 회원에 대한 통지의 경우 서비스 공지게시판 등에 게시함으로써 개별 통지에
      갈음할 수 있습니다.
    </Text>
    <Text style={styles.title}>제 21 조(이용자의 개인정보보호)</Text>
    <Text style={styles.top}>
      회사는 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위하여
      노력합니다. 회원의 개인정보보호에 관해서는 관련법령 및 회사가 정하는
      `&quot;`개인정보처리방침`&quot;`에 정한 바에 의합니다.
    </Text>
    <Text style={styles.title}>제 22 조(개인정보의 위탁)</Text>
    <Text style={styles.top}>
      회사는 수집된 개인정보의 처리 및 관리 등의 업무(이하 `&quot;`업무`&quot;`)를 스스로 수행함을
      원칙으로 하나, 필요한 경우 업무의 일부 또는 전부를 회사가 선정한 회사에 위탁할 수 있습니다.
    </Text>
    <Text style={styles.top}>제 5 장 계약해지 및 이용제한</Text>
    <Text style={styles.title}>제 23 조(계약해제ㆍ해지 및 이용제한)</Text>
    <Text style={styles.top}>
      1. 회원이 서비스 이용계약을 해지하고자 할 경우에는 본인이 웹사이트 상에서 또는 전화, 전자우편,
      모사전송 등 회사가 정한 별도의 이용방법으로 회사에 해지신청을 하여야 합니다.
    </Text>
    <Text style={styles.top}>
      2. 회사는 회원이 제18조에 규정한 회원의 의무를 이행하지 않을 경우 사전 통지 없이 즉시
      이용계약을 해지하거나 또는 서비스 이용을 중지할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      3. 회원이 이용계약을 해지하고자 하는 경우에는 회원 본인이 이용계약 해지신청(회원탈퇴)을 하여야
      합니다. 이용해지 신청은 [정보관리{'>'}개인정보관리{'>'}회원탈퇴]를 통하여 언제든지 할 수
      있습니다.
    </Text>
    <Text style={styles.top}>
      4. 회사는 회원이 이용계약을 체결하여 아이디(ID)와 비밀번호(PASSWORD)를 부여 받은 후에라도
      회원의 자격에 따른 서비스 이용을 제한할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      5. 회사는 `&apos;`정보통신망이용촉진 및 정보보호 등에 관한 법률`&apos;` 및 동법 시행령에 따라
      1년간 서비스를 이용하지 않은 회원의 개인정보를 보호하기 위해 개인정보 파기 등 필요한 조치를
      취합니다.
    </Text>
    <Text style={styles.top}>
      6. 회사는 객관적으로 계정정보 도용 피해가 우려되는 경우 또는 회원이 계속해서 1년 이상
      로그인하지 않을 경우에는 회원정보의 보호 및 운영의 효율성을 위해 임시조치, 이용제한, 계정정보
      삭제 등 필요한 조치를 취할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      단, `&apos;`정보통신망이용촉진 및 정보보호 등에 관한 법률`&apos;` 및 동법 시행령에 따라
      로그인이력이 없더라도 서비스 이용료 자동결제 와 전화상담, 고객센터 문의 등의 이력은 서비스
      이용으로 볼 수 있습니다.
    </Text>
    <Text style={styles.top}>
      7. 본 조 제2항 및 제4항, 제5항의 회사 조치에 대하여 회원은 회사가 정한 절차에 따라 이의 신청을
      할 수 있습니다.
    </Text>
    <Text style={styles.top}>
      8. 본 조 제6항의 이의가 정당하다고 회사가 인정하는 경우, 회사는 즉시 서비스의 이용을
      재개합니다.
    </Text>
    <Text style={styles.title}>제 24 조(양도 금지)</Text>
    <Text style={styles.top}>
      회원은 서비스의 이용권한, 기타 이용 계약상 지위를 타인에게 양도, 증여할 수 없으며 게시물에
      대한 저작권을 포함한 모든 권리 및 책임은 이를 게시한 회원에게 있습니다.
    </Text>
    <Text style={styles.top}>제 6 장 손해배상 등</Text>
    <Text style={styles.title}>제 25 조(손해 배상)</Text>
    <Text style={styles.top}>
      1. 회원이 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 본 약관을
      위반한 회원은 회사에 발생하는 모든 손해를 배상하여야 합니다.
    </Text>
    <Text style={styles.top}>
      2. 회원이 서비스를 이용함에 있어 행한 불법행위나 본 약관 위반행위로 인하여 회사가 당해 회원
      이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는 경우 당해 회원은
      자신의 책임과 비용으로 회사를 면책 시켜야 하며, 회사가 면책되지 못한 경우 당해 회원은 그로
      인하여 회사에 발생한 모든 손해를 배상하여야 합니다.
    </Text>
    <Text style={styles.title}>제 26 조(면책사항)</Text>
    <Text style={styles.top}>
      1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는
      서비스 제공에 관한 책임이 면제됩니다.
    </Text>
    <Text style={styles.top}>
      2. 회사는 회원의 귀책사유로 인한 서비스의 이용장애에 대하여 책임을 지지 않습니다.
    </Text>
    <Text style={styles.top}>
      3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며 그
      밖에 서비스를 통하여 얻은 자료로 인한 손해 등에 대하여도 책임을 지지 않습니다. 회사는 회원이
      사이트에 게재한 정보 • 자료 • 사실의 신뢰도 및 정확성 등 내용에 대하여는 책임을 지지 않습니다.
    </Text>
    <Text style={styles.top}>
      4. 회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할
      의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.
    </Text>
    <Text style={styles.title}>제 27 조(관할법원)</Text>
    <Text style={styles.top}>
      1. 서비스 이용과 관련하여 회사와 회원 사이에 분쟁이 발생한 경우, 회사와 회원은 분쟁의 해결을
      위해 성실히 협의합니다.
    </Text>
    <Text style={styles.top}>
      2. 본 조 제1항의 협의에서도 분쟁이 해결되지 않을 경우 회사의 본사 소재지를 관할하는 법원을
      전속 관할법원으로 합니다.
    </Text>
    <Text style={styles.title}>부칙</Text>
    <Text style={{ marginTop: 18 * tmpWidth, fontWeight: '600', textAlign: 'center' }}>
      (시행일) 본 약관은 2021년 6월 7일부터 시행합니다.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  top: {
    marginTop: 6 * tmpWidth,
  },
  title: {
    fontWeight: '600',
    marginTop: 20 * tmpWidth,
  },
  site: {
    marginTop: 6 * tmpWidth,
    fontWeight: '500',
  },
});

export default TosForm;
